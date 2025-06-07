const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const jwt = require('jsonwebtoken');

const router = express.Router();

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
const jwt_secret = process.env.JWT_SECRET;

router.get('/login', (req, res) => {
  const scope = 'user-read-email';
  const params = new URLSearchParams({
    response_type: 'code',
    client_id,
    scope,
    redirect_uri,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
});


router.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify({
        code,
        redirect_uri,
        grant_type: 'authorization_code',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
        },
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;

    const token = jwt.sign(
      { access_token, refresh_token },
      jwt_secret,
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(400).json({ error: 'Spotify auth failed' });
  }
});

module.exports = router;

