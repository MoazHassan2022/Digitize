const mongoose = require('mongoose');

const rowSchema = mongoose.Schema({
  projectCode: {
    type: String,
    required: [true, 'يجب أن تدخل كود المشروع'],
    trim: true, // Remove all the white space in the beginning or end of the field
  },
  siteName: {
    type: String,
    required: [true, 'يجب أن تدخل اسم الموقع'],
    trim: true,
  },
  cabinetSerial: {
    type: String,
    required: [true, 'يجب أن تدخل رقم الكابينة'],
    trim: true,
  },
  activityID: Number,
  activityGroup: {
    type: String,
    required: [true, 'يجب أن تدخل اسم مجموعة النشاط'],
    trim: true,
  },
  activityType: {
    type: String,
    required: [true, 'يجب أن تدخل نوع النشاط'],
    trim: true,
  },
  measurmentUnit: {
    type: String,
    required: [true, 'يجب أن تدخل وحدة القياس'],
    enum: {
      values: ['م3', 'م', 'وحدة'],
      message: 'وحدة القياس يجب أن تكون م أو م3 أو وحدة',
    },
  },
  dayProgress: {
    type: String,
    required: [true, 'يجب أن تدخل وصف تقدم اليوم'],
    trim: true,
  },
  deliveryWay: {
    type: String,
    required: [true, 'يجب أن تدخل طريقة التسليم'],
    enum: {
      values: ['في المنزل', 'مقاول فرعي'],
      message: 'طريقة التسليم يجب أن تكون في المنزل أو مقاول فرعي',
    },
  },
  deliveryTeam: {
    type: String,
    required: [true, 'يجب أن تدخل اسم مشرف فريق التسليم'],
    trim: true,
  },
  siteEngineer: {
    type: String,
    required: [true, 'يجب أن تدخل اسم مهندس الموقع'],
    trim: true,
  },
  siteSupervisorMain: {
    type: String,
    required: [true, 'يجب أن تدخل اسم مشرف الموقع الرئيسي'],
    trim: true,
  },
  siteSupervisorAssistant: {
    type: String,
    required: [true, 'يجب أن تدخل اسم مشرف الموقع المساعد'],
    trim: true,
  },
  date: String, // Day-Month-Year
});

const Row = mongoose.model('Row', rowSchema);

module.exports = Row;
