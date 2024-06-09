
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const busRoutes = require('./routes/busRoutes');
require('dotenv').config();
//port
const app = express();
const port = process.env.PORT || 5000;

// Firebase setup
const serviceAccount = require('./config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://bus-tracking-cf33e.firebaseio.com'
});

const db = admin.firestore();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api', busRoutes(db)); // Pass Firestore instance to routes

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
