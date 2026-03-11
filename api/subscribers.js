import jwt from 'jsonwebtoken';

export const subscribers = []; // shared memory storage

export default function handler(req, res) {
  if (req.method === 'GET') {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    try {
      jwt.verify(token, process.env.JWT_SECRET || 'secret123');
      res.status(200).json({ data: subscribers });
    } catch {
      res.status(403).json({ message: 'Invalid or expired token' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}