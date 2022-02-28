const userModel = require('./user.model');

const getAllUserController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllUserController,
};
