const mongoose = require("mongoose");

const activitySchema = mongoose.Schema({
  activityGroupID: {
    type: String,
    required: [true, "يجب أن تدخل رقم مجموعة النشاط"],
    unique: [true, "هذه المجموعة موجود من قبل"],
    trim: true, // Remove all the white space in the beginning or end of the field
  },
  activityGroupName: {
    type: String,
    required: [true, "يجب أن تدخل اسم مجموعة النشاط"],
    unique: [true, "هذه المجموعة موجود من قبل"],
    trim: true,
  },
  activityTypes: [String],
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
