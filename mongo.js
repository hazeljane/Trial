// mongo.js
const { MongoClient } = require('mongodb');

const MONGO_URI = 'mongodb+srv://gunohazeljane:hazel_123@cluster0.4casr.mongodb.net/subscriberDB?retryWrites=true&w=majority';

if (!MONGO_URI) {
  throw new Error('Please define MONGO_URI in this file');
}

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGO_URI, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(MONGO_URI, options);
  clientPromise = client.connect();
}

module.exports = clientPromise;