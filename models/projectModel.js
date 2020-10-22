const mongoose = require('mongoose');
const slugify = require('slugify');
const projectSchema = mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

projectSchema.pre('validate', function (next) {
  if (this.name) {
    this.slug = slugify(this.name, {
      strict: true,
    });
  }
  next();
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
