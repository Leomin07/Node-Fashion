const categoryModel = require('./category.model');

const getAllCategoryService = async () => {
  return await categoryModel.find();
};

const addCategoryService = async data => {
  const newCategory = new categoryModel(data);
  await newCategory.save();
};

const updateCategoryService = async (_id, data) => {
  return await categoryModel.findByIdAndUpdate({ _id: _id }, data, {
    new: true,
  });
};

const removeCategoryService = async id => {
  return await categoryModel.findOneAndRemove({ _id: id });
};

module.exports = {
  getAllCategoryService,
  addCategoryService,
  updateCategoryService,
  removeCategoryService,
};
