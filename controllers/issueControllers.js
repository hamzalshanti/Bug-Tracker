const Issue = require('../models/issueModel');
const Project = require('../models/projectModel');
const { validationResult } = require('express-validator');
const { log } = require('debug');

const getAllIssues = async (req, res, next) => {
  try {
    const issues = await Issue.find({}).select({
      Comments: 0,
    });
    if (issues.length === 0)
      return res.status(200).json({
        issues: [],
      });
    return res.status(200).json(issues);
  } catch (err) {
    next(err);
  }
};

const getIssue = async (req, res, next) => {
  try {
    const issue = await Issue.findById(req.params.id).select({
      Comments: 0,
    });
    return res.status(200).json(issue);
  } catch (err) {
    next(err);
  }
};

const createIssue = async (req, res, next) => {
  try {
    const { errors } = validationResult(req);
    if (errors.length > 0)
      return res.status(422).json({
        errors: errors,
      });

    // Get project Slug.
    const { slug } = await Project.findById(req.body.Project_ID);
    const number = await Issue.find({
      Project_ID: req.body.Project_ID,
    }).countDocuments();
    const issue = await Issue.create({
      issueNumber: `${slug}-${number + 1}`,
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      Project_ID: req.body.Project_ID,
    });
    return res.status(201).json({
      message: 'created successfully',
      issue: issue,
    });
  } catch (err) {
    next(err);
  }
};

//const updateIssueStatus = (req, res) => {};

const getAllComments = async (req, res, next) => {
  try {
    const comments = await Issue.findById(req.params.id).select({
      _id: 0,
      Comments: 1,
    });
    if (comments.length === 0)
      return res.status(200).json({
        comments: [],
      });
    return res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

const getComment = async (req, res, next) => {
  try {
    const { Comments } = await Issue.findOne({
      _id: req.params.issueId,
    });
    return res.status(200).json({
      Comment: Comments.find(
        (comment) => comment._id.toString() === req.params.commentId
      ),
    });
  } catch (err) {
    next(err);
  }
};

const createComment = async (req, res, next) => {
  try {
    const { errors } = validationResult(req);
    if (errors.length > 0)
      return res.status(422).json({
        errors: errors,
      });
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          Comments: {
            text: req.body.text,
            author: req.body.author,
          },
        },
      },
      {
        new: true,
      }
    );
    return res.status(201).json({
      message: 'created successfully',
      Comments: issue,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllIssues,
  getIssue,
  createIssue,
  //updateIssueStatus,
  getAllComments,
  getComment,
  createComment,
};
