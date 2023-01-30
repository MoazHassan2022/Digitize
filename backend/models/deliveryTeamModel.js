const mongoose = require("mongoose");

const deliveryTeamSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "يجب أن تدخل اسم مشرف فريق التسليم"],
    trim: true, // Remove all the white space in the beginning or end of the field
  },
});

const DeliveryTeam = mongoose.model("DeliveryTeam", deliveryTeamSchema);

module.exports = DeliveryTeam;
