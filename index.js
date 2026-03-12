const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Config
const PORT = 3000;
const MONGO_URI = 'mongodb+srv://gunohazeljane:hazel_123@cluster0.4casr.mongodb.net/subscriberDB?retryWrites=true&w=majority';
const JWT_SECRET = 'mysecret123';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Serve HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));