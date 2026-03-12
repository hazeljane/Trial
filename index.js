// index.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const clientPromise = require('./mongo.js'); // Mongo connection

const app = express();
const PORT = 3000; // Or use process.env.PORT for Vercel

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// -------------------
// API ROUTES
// -------------------

// 1️⃣ Subscribe route
app.post('/api/subscribe', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Name and email required' });

    const client = await clientPromise;
    const db = client.db('subscriberDB');
    const collection = db.collection('subscribers');

    await collection.insertOne({ name, email, subscribedAt: new Date() });

    res.json({ message: 'You have successfully subscribed!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 2️⃣ Admin login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Dummy admin credentials
  if (username === 'admin' && password === 'admin') {
    res.json({ success: true, token: 'fake-jwt-token' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// 3️⃣ Subscribers list route
app.get('/api/subscribers', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== 'Bearer fake-jwt-token') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('subscriberDB');
    const collection = db.collection('subscribers');

    const subscribers = await collection.find({}).toArray();
    res.json({ data: subscribers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// -------------------
// Start server
// -------------------
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));