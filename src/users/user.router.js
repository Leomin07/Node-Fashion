const express = require('express');
const { verifyToken } = require('../config/middlewareController');
const { getAllUserController } = require('./user.controller');

const userRouter = express.Router();

//get all users
userRouter.get('/users', verifyToken, getAllUserController);

module.exports = userRouter;
