const { Router } = require('express');
const router = Router();

const {
  getAllIssues,
  getIssue,
  createIssue,
  getAllComments,
  getComment,
  createComment,
} = require('../controllers/issueControllers');

const { issueValidation, commentValidation } = require('../utils/validation');

// Get all issues
router.get('/', getAllIssues);

// Get issue by id
router.get('/:id', getIssue);

// Create issue
router.post('/', issueValidation, createIssue);

// Get comments related with issue
router.get('/:id/comments', getAllComments);

// Get spesific comments related with issue
router.get('/:issueId/comments/:commentId', getComment);

// Create comment
router.post('/:id/comments', commentValidation, createComment);

module.exports = router;
