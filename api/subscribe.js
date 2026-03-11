import { subscribers } from './subscribers.js';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Name and email required' });

    subscribers.push({ name, email });
    res.status(200).json({ message: `Thank you for subscribing, ${name}!` });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}