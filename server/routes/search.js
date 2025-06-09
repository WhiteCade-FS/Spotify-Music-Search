const express = require('express');
const axios = require('axios');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  const { access_token } = req.user;
  const { q, type = 'track' } = req.query;

  try {
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: { Authorization: `Bearer ${access_token}` },
      params: { q, type }
    });

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(400).json({ error: 'Spotify search failed' });
  }
});

module.exports = router;
