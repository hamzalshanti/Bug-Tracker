const User = require('../models/userModel');
const { validationResult } = require('express-validator');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0)
      return res.status(200).json({
        users: [],
      });
    return res.status(200).json({
      users: users,
    });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { errors } = validationResult(req);
    if (errors.length > 0)
      return res.status(422).json({
        errors: errors,
      });
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      usertype: req.body.usertype,
    });
    return res.status(201).json({
      message: 'created successfully',
      user: user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
};
