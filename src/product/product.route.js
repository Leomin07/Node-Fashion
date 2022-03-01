const express = require('express');
const {
  getAllProductsController,
  addProductController,
  getProductByIdController,
  deleteProductController,
  updateProductController,
} = require('./product.controller');

const productRouter = express.Router();

productRouter
  .route('/products')
  .get(getAllProductsController)
  .post(addProductController);

productRouter
  .route('/products/:id')
  .get(getProductByIdController)
  .delete(deleteProductController)
  .put(updateProductController);

module.exports = productRouter;
