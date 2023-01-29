const mongoose = require("mongoose");

const cabineSchema = mongoose.Schema({
  cabineCode: {
    type: String,
    required: [true, "يجب أن تدخل الرقم المسلسل للكابينة"],
    unique: [true, "هذا الرقم موجود من قبل"],
    trim: true, // Remove all the white space in the beginning or end of the field
  },
});

const Cabine = mongoose.model("Cabine", cabineSchema);

module.exports = Cabine;
