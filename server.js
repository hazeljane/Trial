require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

const subscriberSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }
});
const Subscriber = mongoose.model('Subscriber', subscriberSchema);

const admin = { username: "admin", password: "1234" };

app.post('/subscribe', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ message: "Name/email required" });

  try {
    const exists = await Subscriber.findOne({ email });
    if (exists) return res.status(400).json({ message: "Subscriber already exists" });

    const newSub = new Subscriber({ name, email });
    await newSub.save();
    res.json({ message: "Subscriber added successfully" });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: "Subscriber exists" });
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === admin.username && password === admin.password) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: "Invalid login" });
  }
});

app.get('/subscribers', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    const subscribers = await Subscriber.find();
    res.json({ data: subscribers });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));