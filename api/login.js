
import jwt from "jsonwebtoken";

const admin = { username: "admin", password: "1234" };

export default function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  const { username, password } = req.body;

  if (username === admin.username && password === admin.password) {
    // Create JWT token
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ success: true, token });
  }

  return res.status(401).json({ success: false, message: "Invalid login" });
}