const mongoose = require("mongoose");

const deliveryWaySchema = mongoose.Schema({
  way: {
    type: String,
    required: [true, "يجب أن تدخل طريقة التسليم"],
    trim: true, // Remove all the white space in the beginning or end of the field
  },
});

const DeliveryWay = mongoose.model("DeliveryWay", deliveryWaySchema);

module.exports = DeliveryWay;
