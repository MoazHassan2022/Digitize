const mongoose = require("mongoose");

const measurementUnitSchema = mongoose.Schema({
  unit: {
    type: String,
    required: [true, "يجب أن تدخل وحدة القياس"],
    unique: [true, "هذه الوحدة موجود من قبل"],
    trim: true, // Remove all the white space in the beginning or end of the field
  },
});

const MeasurementUnit = mongoose.model(
  "MeasurementUnit",
  measurementUnitSchema
);

module.exports = MeasurementUnit;
