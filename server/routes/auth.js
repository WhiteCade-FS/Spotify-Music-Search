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
  const scope = 'user-read-private user-read-email';

  const queryParams = querystring.stringify({
    response_type: 'code',
    client_id,
    scope,
    redirect_uri,
  });
  

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
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
            'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
        },
      }
    );

    const { access_token, refresh_token } = response.data;

    const token = jwt.sign({ access_token, refresh_token }, jwt_secret, { expiresIn: '1h' });


    res.redirect(`https://spotify-music-search-six.vercel.app/?token=${token}`);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(400).json({ error: 'Spotify auth failed' });
  }
});


router.post('/refresh-token', async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, jwt_secret);
    const { refresh_token } = decoded;

    if (!refresh_token) {
      return res.status(400).json({ error: 'Missing refresh token in JWT' });
    }

    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
        },
      }
    );

    const { access_token, expires_in } = response.data;

    const newToken = jwt.sign({ access_token, refresh_token }, jwt_secret, {
      expiresIn: '1h',
    });

    res.json({ access_token, token: newToken, expires_in });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(403).json({ error: 'Invalid or expired token' });
  }
});



router.post('/validate-token', (req, res) => {
  const { token } = req.body;

  try {
    jwt.verify(token, jwt_secret);
    res.json({ valid: true });
  } catch (err) {
    res.json({ valid: false });
  }
});


module.exports = router;
