const express = require('express');
const {
  addCategoryController,
  getAllCategoryController,
  updateCategoryController,
  removeCategoryController,
} = require('./category.controller');

const categoryRouter = express.Router();

categoryRouter
  .route('/category')
  .get(getAllCategoryController)
  .post(addCategoryController);

categoryRouter
  .route('/category/:id')
  .put(updateCategoryController)
  .delete(removeCategoryController);

module.exports = categoryRouter;
