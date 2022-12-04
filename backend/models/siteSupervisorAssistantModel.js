const mongoose = require("mongoose");

const siteSupervisorAssistantSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "يجب أن تدخل اسم مشرف الموقع المساعد"],
    trim: true, // Remove all the white space in the beginning or end of the field
  },
});

const SiteSupervisorAssistant = mongoose.model(
  "SiteSupervisorAssistant",
  siteSupervisorAssistantSchema
);

module.exports = SiteSupervisorAssistant;
