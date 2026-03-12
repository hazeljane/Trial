const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ----- Define config directly here -----
const PORT = 3000;
const MONGO_URI = 'mongodb+srv://gunohazeljane:hazel_123@cluster0.4casr.mongodb.net/subscriberDB?retryWrites=true&w=majority';
// If you use JWT in other routes, define secret too:
const JWT_SECRET = 'mysecret123';

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Test route
app.get('/', (req, res) => res.send('Server running'));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));