const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  appointmentTime: {
    type: Date,
    required: true
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }
  ],
  createdAt: { type: Date, default: Date.now, expires: 15 * 24 * 60 * 60 },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
