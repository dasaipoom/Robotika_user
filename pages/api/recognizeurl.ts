import { NextApiHandler, NextApiRequest } from "next";
import path from "path";
import fs from "fs/promises";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import rateLimit from "../../utils/rateLimit";

import { CompreFace } from "@exadel/compreface-js-sdk";
import { constants } from "buffer";
import { PathLike } from "fs";

let hostIp = process.env.HOST_IP;
// setup compare face
let api_key = "6c060f29-4690-402a-a5ab-8d4b44115f5a";
let url = `http://${hostIp}`;
let port = 8003;
let faceoptions = {
  limit: 0,
  det_prob_threshold: 0.98,
  prediction_count: 1,
  face_plugins: "calculator,age,gender",
  status: true,
};
// create face function
let compreFace = new CompreFace(url, port); // set CompreFace url and port
let recognitionService = compreFace.initFaceRecognitionService(api_key); // initialize service

let faceCollection = recognitionService.getFaceCollection(); // use face collection to fill it with known faces
let verificationService = compreFace.initFaceVerificationService(api_key);
//setup rate limiter
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 10, // Max 500 users per second
});
// Name face function

async function reclocalpic(filePath: any) {
  if (filePath) {
    try {
      const response = (await recognitionService.recognize(
        filePath,
        faceoptions
      )) as {
        result: { subjects: any[] }[];
        plugins_versions: Record<string, string>;
      };
      await fs.unlink(filePath);
      console.log(`Image file ${filePath} deleted successfully`);
      const subjects = response.result[0]?.subjects;
      console.log(subjects);
      if (subjects) {
        if (subjects[0]?.similarity > 0.97) {
          return subjects;
        } else {
          return "No person found";
        }
      } else {
        console.error("No subjects found in the response");
        return {
          error: "No subjects found in the response",
        };
      }
    } catch (error) {
      console.error(
        `Oops! There is a problem with recognizing the image: ${error}`
      );
      return {
        error: `Oops! There is a problem with recognizing the image: ${error}`,
      };
    }
  }
  return { error: "No image file found" };
}

// make face Rec api
export const config = {
  api: {
    bodyParser: false,
  },
};

const downloadImage = async (
  url: string,
  savePath: PathLike | fs.FileHandle
) => {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });
  await fs.writeFile(savePath, response.data);
};

const handler: NextApiHandler = async (req, res) => {
  try {
    await fs.readdir(path.join(process.cwd() + "/public", "/images"));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public", "/images"));
  }
  try {
    await limiter.check(res, "CACHE_TOKEN"); // 10 requests per minute
    const { url } = req.query; // Assuming the URL is passed as a query parameter
    const filePath = path.join(
      process.cwd() + "/public",
      "/images",
      "temp.jpg"
    );
    if (url) {
      try {
        await downloadImage(url.toString(), filePath);
        const face_res = await reclocalpic(filePath);
        if (Array.isArray(face_res) && face_res.length > 0) {
          const result = {
            subject: face_res[0].subject,
            similarity: face_res[0].similarity,
          };

          res.json(result);
        } else {
          res.json({ result: "No person found" });
        }
      } catch (error) {
        res.json({ error: "Error processing the image" });
      }
    } else {
      res.json({ error: "Plese input image url" });
    }
  } catch {
    res.status(429).json({ error: "Rate limit exceeded" });
  }
};

export default handler;
