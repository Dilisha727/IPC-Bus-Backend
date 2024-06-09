
const express = require('express');

module.exports = (db) => {
  const router = express.Router();
  const busesCollection = db.collection('buses');

  // Get all buses
  router.get('/buses', async (req, res) => {
    try {
      const snapshot = await busesCollection.get();
      const buses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(buses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // Add a new bus
  router.post('/buses', async (req, res) => {
    const bus = {
      id: req.body.id,
      lat: req.body.lat,
      lng: req.body.lng,
      timestamp: new Date()
    };
    try {
      await busesCollection.doc(bus.id).set(bus);
      res.status(201).json(bus);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // Get a bus by ID
  router.get('/buses/:id', async (req, res) => {
    try {
      const doc = await busesCollection.doc(req.params.id).get();
      if (!doc.exists) {
        return res.status(404).json({ message: 'Bus not found' });
      }
      res.json(doc.data());
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  return router;
};


