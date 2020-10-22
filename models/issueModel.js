const mongoose = require('mongoose');
const commentsSchema = mongoose.Schema({
  text: {
    type: 'String',
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
const issueSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  issueNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  Project_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  Comments: [
    {
      type: commentsSchema,
    },
  ],
});
const Issue = mongoose.model('Issue', issueSchema);
module.exports = Issue;
