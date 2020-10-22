const Project = require('../models/projectModel');
const { validationResult } = require('express-validator');

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    if (projects.length === 0)
      return res.status(200).json({
        projects: [],
      });
    return res.status(200).json({
      projects: projects,
    });
  } catch (err) {
    next(err);
  }
};

const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    return res.status(200).json({
      project: project,
    });
  } catch (err) {
    next(err);
  }
};

const createProject = async (req, res, next) => {
  try {
    const { errors } = validationResult(req);
    if (errors.length > 0)
      return res.status(422).json({
        errors: errors,
      });
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
    });
    return res.status(201).json({
      message: 'created successfully',
      project: project,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProjects,
  getProject,
  createProject,
};
