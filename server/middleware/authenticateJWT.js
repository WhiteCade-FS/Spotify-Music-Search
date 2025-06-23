const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, jwt_secret, (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Invalid or expired JWT' });

      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ message: 'Missing or malformed Authorization header' });
  }
}

module.exports = authenticateJWT;
