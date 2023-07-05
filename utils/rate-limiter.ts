import { NextApiResponse, NextApiRequest } from "next";
import { LRUCache } from "lru-cache";

// Set the limit to 10 requests per interval
const limit = 10;

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export default function rateLimit(options?: Options) {
  const tokenCache = new LRUCache({
    max: limit,
    ttl: options?.interval || 60 * 1000, // Default interval of 1 minute (60 seconds)
  });

  return function rateLimiterMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => void
  ) {
    const token = req.headers.authorization || req.query.token || req.cookies.token; // Update this with your token retrieval logic

    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const tokenCount = (tokenCache.get(token) as number[]) || [0];
    if (tokenCount[0] === 0) {
      tokenCache.set(token, tokenCount);
    }
    tokenCount[0] += 1;

    const currentUsage = tokenCount[0];
    const isRateLimited = currentUsage > limit;

    res.setHeader("X-RateLimit-Limit", limit);
    res.setHeader("X-RateLimit-Remaining", isRateLimited ? 0 : limit - currentUsage);

    if (isRateLimited) {
      res.status(429).json({ error: "Rate limit exceeded" });
      return;
    }

    next();
  };
}