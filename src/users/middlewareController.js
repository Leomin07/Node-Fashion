const jwt = require('jsonwebtoken');

const generateAccessToken = payload => {
  return jwt.sign(
    {
      id: payload.id,
      admin: payload.isAdmin,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_LIFE,
    }
  );
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  const accessToken = token.split(' ')[1];
  if (!accessToken) {
    res.status(401).json('You are not authorized');
  }
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json('token is not valid');
  }
};

const generateRefreshToken = payload => {
  return jwt.sign(
    {
      id: payload.id,
      admin: payload.isAdmin,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_LIFE,
    }
  );
};

module.exports = {
  verifyToken,
  generateAccessToken,
  generateRefreshToken,
};
