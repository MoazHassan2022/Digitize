const mongoose = require("mongoose");

const siteEngineerSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "يجب أن تدخل اسم مهندس الموقع"],
    trim: true, // Remove all the white space in the beginning or end of the field
  },
});

const SiteEngineer = mongoose.model("SiteEngineer", siteEngineerSchema);

module.exports = SiteEngineer;
