const express = require('express');
const { verifyToken } = require('./middlewareController');
const { getAllUserController } = require('./user.controller');

const userRouter = express.Router();

//get all users
userRouter.get('/', getAllUserController);

module.exports = userRouter;
