const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const connectDb = require('./config/db.config');

const userRouter = require('./users/user.router');
const authRouter = require('./auth/auth.route');
const categoryRouter = require('./category/category.route');
const productRouter = require('./product/product.route');

const app = express();
const port = process.env.PORT || 3000;

//connect database
connectDb();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

//router
app.use(userRouter);
app.use(authRouter);
app.use(categoryRouter);
app.use(productRouter);

app.listen(port, () => {
  console.log(`App running: ${port}`);
  console.log(port);
});
