const express = require('express');
const { verifyToken } = require('../config/middlewareController');
const {
  registerController,
  loginController,
  refreshTokenController,
  logoutController,
} = require('./auth.controller');

const authRouter = express.Router();

//register
authRouter.post('/register', registerController);

//login
authRouter.post('/login', loginController);

//refresh token
authRouter.post('/refresh', refreshTokenController);

//logout
authRouter.post('/logout', verifyToken, logoutController);

module.exports = authRouter;
