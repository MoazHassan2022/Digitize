const mongoose = require("mongoose");

const siteSupervisorMainSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "يجب أن تدخل اسم مشرف الموقع الرئيسي"],
    trim: true, // Remove all the white space in the beginning or end of the field
  },
});

const SiteSupervisorMain = mongoose.model(
  "SiteSupervisorMain",
  siteSupervisorMainSchema
);

module.exports = SiteSupervisorMain;
