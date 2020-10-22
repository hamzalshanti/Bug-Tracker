const { body } = require('express-validator');
const User = require('../models/userModel');
const Project = require('../models/projectModel');

const userValidation = [
  body('name').notEmpty().withMessage('please enter the name of user'),
  body('email')
    .isEmail()
    .withMessage('please enter valid email')
    .custom(async (value) => {
      user = await User.findOne({ email: value });
      if (user) throw 'email already used before';
      return true;
    }),
  body('usertype')
    .isIn(['admin', 'user'])
    .withMessage('please select role: [admin/user]'),
];

const projectValidation = [
  body('name').notEmpty().withMessage('please enter the name of project'),
  body('description')
    .notEmpty()
    .withMessage('please add description for project'),
];

const issueValidation = [
  body('title').notEmpty().withMessage('please enter the title of issue'),
  body('status')
    .isIn(['todo', 'wip', 'blocked', 'closed'])
    .withMessage(`status must Involove ['todo', 'wip', 'blocked', 'closed']`),
  body('Project_ID')
    .notEmpty()
    .custom(async (value) => {
      try {
        const project = await Project.findById(value);
        if (project) return true;
        throw 'The project you are trying to select does not found';
      } catch (err) {
        throw 'The project you are trying to select does not found';
      }
    }),
];

const commentValidation = [
  body('text').trim().notEmpty().withMessage('please enter comment'),
  body('author')
    .notEmpty()
    .withMessage('please enter the title of issue')
    .custom(async (value) => {
      try {
        const user = await User.findById(value);
        if (user) return true;
        throw 'The user you are trying to select does not found';
      } catch (err) {
        throw 'The user you are trying to select does not found';
      }
    }),
];

module.exports = {
  userValidation,
  projectValidation,
  issueValidation,
  commentValidation,
};
