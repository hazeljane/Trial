import jwt from 'jsonwebtoken';

const admin = { username: 'admin', password: '1234' };

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (username === admin.username && password === admin.password) {
      const token = jwt.sign({ username }, process.env.JWT_SECRET || 'secret123', { expiresIn: '1h' });
      res.status(200).json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}