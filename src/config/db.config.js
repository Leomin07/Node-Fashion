const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log('connect successful');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
