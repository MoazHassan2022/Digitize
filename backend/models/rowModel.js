const mongoose = require("mongoose");

const rowSchema = mongoose.Schema({
  sender: {
    type: String,
  },
  projectCode: {
    type: String,
    required: [true, "يجب أن تدخل كود المشروع"],
    trim: true, // Remove all the white space in the beginning or end of the field
  },
  siteName: {
    type: String,
    required: [true, "يجب أن تدخل اسم الموقع"],
    trim: true,
  },
  cabinetSerial: {
    type: String,
    required: [true, "يجب أن تدخل رقم الكابينة"],
    trim: true,
  },
  activityID: Number,
  activityGroup: {
    type: String,
    required: [true, "يجب أن تدخل اسم مجموعة النشاط"],
    trim: true,
  },
  activityType: {
    type: String,
    required: [true, "يجب أن تدخل نوع النشاط"],
    trim: true,
  },
  measurmentUnit: {
    type: String,
    required: [true, "يجب أن تدخل وحدة القياس"],
    enum: {
      values: ["م3", "م", "وحدة"],
      message: "وحدة القياس يجب أن تكون م أو م3 أو وحدة",
    },
  },
  dayProgress: {
    type: Number,
    required: [true, "يجب أن تدخل انجاز اليوم"],
    trim: true,
  },
  deliveryWay: {
    type: String,
    required: [true, "يجب أن تدخل طريقة التسليم"],
  },
  deliveryTeam: {
    type: String,
    required: [true, "يجب أن تدخل اسم مشرف فريق التسليم"],
    trim: true,
  },
  siteEngineer: {
    type: String,
    required: [true, "يجب أن تدخل اسم مهندس الموقع"],
    trim: true,
  },
  siteSupervisorMain: {
    type: String,
    required: [true, "يجب أن تدخل اسم مشرف الموقع الرئيسي"],
    trim: true,
  },
  siteSupervisorAssistant: {
    type: String,
    required: [true, "يجب أن تدخل اسم مشرف الموقع المساعد"],
    trim: true,
  },
  date: String, // Day-Month-Year
  photo: String,
});

const Row = mongoose.model("Row", rowSchema);

module.exports = Row;
