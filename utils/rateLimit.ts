import type { NextApiResponse } from "next";
import { LRUCache } from "lru-cache";
//set full limit
const limit = 100;
type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export default function rateLimit(options?: Options) {
  const tokenCache = new LRUCache({
    max: limit, // Maximum limit of 100 tokens (requests) per day
    ttl: 24 * 60 * 60 * 1000, // Expiration time of 24 hours (1 day) in milliseconds
  });

  return {
    check: (res: NextApiResponse, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;
        res.setHeader("X-RateLimit-Limit", limit);
        res.setHeader(
          "X-RateLimit-Remaining",
          isRateLimited ? 0 : limit - currentUsage
        );

        return isRateLimited ? reject() : resolve();
      }),
  };
}
