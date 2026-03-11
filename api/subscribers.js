// api/subscribers.js
import jwt from 'jsonwebtoken';

// Temporary in-memory subscriber storage
let subscribers = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Missing Authorization header' });
    }

    const token = authHeader.split(' ')[1];

    try {
      jwt.verify(token, process.env.JWT_SECRET || 'secret123');

      res.status(200).json({ data: subscribers });
    } catch (err) {
      res.status(403).json({ message: 'Invalid or expired token' });
    }
  } else if (req.method === 'POST') {
    // Optional: save subscribers here if POSTed
    const { name, email } = req.body;
    subscribers.push({ name, email });
    res.status(200).json({ message: `Subscriber ${name} added` });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}