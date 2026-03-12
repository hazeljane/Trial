import clientPromise from "../mongo.js";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method Not Allowed" });

  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);

    const client = await clientPromise;
    const db = client.db("myDatabase");

    const subscribers = await db
      .collection("subscribers")
      .find()
      .toArray();

    res.status(200).json({ data: subscribers });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}