import clientPromise from "../mongo.js";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  const { name, email } = req.body;

  if (!name || !email)
    return res.status(400).json({ message: "Name and email required" });

  try {
    const client = await clientPromise;
    const db = client.db("myDatabase");

    const exists = await db.collection("subscribers").findOne({ email });

    if (exists)
      return res.status(400).json({ message: "Subscriber already exists" });

    await db.collection("subscribers").insertOne({ name, email });

    res.status(200).json({ message: `Thank you for subscribing, ${name}!` });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}