const { Router } = require('express');
const router = Router();

const {
  getAllProjects,
  getProject,
  createProject,
} = require('../controllers/projectControllers');
const { validateObjectId, isExist } = require('../middlewares/mongoMiddleware');
const { projectValidation } = require('../utils/validation');

// Get all projects
router.get('/', getAllProjects);

// Get project by id
router.get('/:id', validateObjectId, isExist('Project'), getProject);

// Create project
router.post('/', projectValidation, createProject);

module.exports = router;
