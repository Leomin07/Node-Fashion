const productModel = require('./product.model');

const addProductController = async (req, res) => {
  try {
    const product = new productModel({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    });

    await product.save();

    if (!product) return res.status(400).json('can not save product');
    res.status(201).json('Done');
  } catch (error) {
    res.status(500).json(error);
  }
};
const getAllProductsController = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getProductByIdController = async (req, res) => {
  try {
    const product = await productModel.findById({ _id: req.params.id });
    if (!product) return res.status(404).json('product not found');
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateProductController = async (req, res) => {
  try {
    const product = {
      name: req.params.name,
      price: req.params.price,
      // category: req.params.category,
    };
    const newProduct = await productModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};
const deleteProductController = async (req, res) => {
  try {
    const product = await productModel.findById({ _id: req.params.id });
    if (!product) res.status(404).json('product not found');
    else await productModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json('delete product successfully');
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
};
