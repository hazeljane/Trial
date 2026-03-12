const clientPromise = require('../mongo');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Missing name/email' });

    const client = await clientPromise;
    const db = client.db('subscriberDB');
    const collection = db.collection('subscribers');

    await collection.insertOne({ name, email, subscribedAt: new Date() });
    res.status(200).json({ message: 'Subscribed successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};