const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  projectCode: {
    type: String,
    required: [true, "يجب أن تدخل كود المشروع"],
    unique: [true, "هذا المشروع موجود من قبل"],
    trim: true, // Remove all the white space in the beginning or end of the field
  },
  map: String,
  squares: Array.of(Array.of(Number)),
  siteNames: [String],
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
