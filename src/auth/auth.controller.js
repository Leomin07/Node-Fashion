const bcryptjs = require('bcryptjs');
const userModel = require('../users/user.model');
const jwt = require('jsonwebtoken');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../config/middlewareController');

let refreshTokens = [];

const registerController = async (req, res) => {
  try {
    const hash = await bcryptjs.hash(req.body.password, 10);
    const newUser = await new userModel({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    const user = await newUser.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.body.username });
    if (!user) {
      res.status(404).send('user not found');
    }
    const validPassword = await bcryptjs.compareSync(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(404).send('wrong password');
    }
    if (user && validPassword) {
      const access_token = generateAccessToken(user);
      const refresh_token = generateRefreshToken(user);
      res.cookie('refreshToken', refresh_token, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
      });
      // remove password with user
      const { password, ...others } = user._doc;
      res.status(200).send({ ...others, access_token });
    }
  } catch (error) {
    res.send(error);
  }
};

const refreshTokenController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) res.status(401).json('You are not authorized');
  if (!refreshToken.includes(refreshToken))
    res.status(403).json('refresh Token is not valid');

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) console.log(err);
    refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    refreshTokens.push(newRefreshToken);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      path: '/',
      sameSite: 'strict',
    });
    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
};

const logoutController = (req, res) => {
  refreshTokens = refreshTokens.filter(
    token => token !== req.cookies.refreshToken
  );
  res.clearCookie('refreshToken');
  res.status(200).json('Logout Success');
};

module.exports = {
  registerController,
  loginController,
  refreshTokenController,
  logoutController,
};
