// api/subscribe.js
import clientPromise from "../mongo.js";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).json({ message: "Name and email required" });

  try {
    const client = await clientPromise;
    const db = client.db("subscriberDB");
    const collection = db.collection("subscribers");

    const exists = await collection.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Subscriber already exists" });

    await collection.insertOne({ name, email, subscribedAt: new Date() });

    res.status(200).json({ message: "You have successfully subscribed!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}