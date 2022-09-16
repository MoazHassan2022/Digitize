const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  projectCode: {
    type: String,
    required: [true, 'يجب أن تدخل كود المشروع'],
    trim: true, // Remove all the white space in the beginning or end of the field
  },
  siteNames: [String],
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
