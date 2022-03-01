const {
  getAllCategoryService,
  addCategoryService,
  updateCategoryService,
  removeCategoryService,
} = require('./category.service');

const getAllCategoryController = async (req, res) => {
  try {
    const data = await getAllCategoryService();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addCategoryController = async (req, res) => {
  try {
    await addCategoryService({ name: req.body.name });
    res.status(201).json({ message: 'Done' });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const data = await updateCategoryService(req.params.id, req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const removeCategoryController = async (req, res) => {
  try {
    await removeCategoryService(req.params.id);
    res.status(200).json('Removed Category Success');
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllCategoryController,
  addCategoryController,
  updateCategoryController,
  removeCategoryController,
};
