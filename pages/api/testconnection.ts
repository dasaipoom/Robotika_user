import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
    try {
        console.log("test connection");
        res.status(200).send("connection ok");
    }   catch {
        res.status(400).json({ error: "Can't connect to server" });
    }
  
};

export default handler;