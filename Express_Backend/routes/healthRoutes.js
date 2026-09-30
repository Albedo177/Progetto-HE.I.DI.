const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/healthz', (req, res) => {
  // Verifica la connessione al database
  db.get('SELECT 1', (err) => {
    if (err) {
      return res.status(500).json({ status: 'DOWN', database: 'DISCONNECTED', error: err.message });
    }
    res.status(200).json({
      status: 'UP',
      timestamp: new Date().toISOString(),
      database: 'CONNECTED'
    });
  });
});

module.exports = router;