const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  date: {
    type: String, // "YYYY-MM-DD"
    required: true,
    unique: true
  },
  slots: [
    {
      startTime: Date,
      endTime: Date,
      isBooked: {
        type: Boolean,
        default: false
      }
    }
  ]
});

module.exports = mongoose.model("slot", slotSchema);
