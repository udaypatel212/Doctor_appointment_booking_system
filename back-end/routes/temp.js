const express = require('express');
const router = express.Router();
const { generateSlots } = require('../utility/generateSlots');
const Slot = require('../models/slot'); // Slot model

//  Get available slots for a specific date

router.get('/getAvailableSlots/:date', async (req, res) => {
  try {
    const { date } = req.params;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    // 🔍 Check if slots already exist for the given date
    let slotDoc = await Slot.findOne({ date });

    // If not found, generate default slots for that date
    if (!slotDoc) {
      const generatedSlots = generateSlots(date); // defaults: 4PM–11PM, 30 mins

      const slotsToSave = generatedSlots.map(slot => ({
        startTime: slot.startTime,
        endTime: slot.endTime,
        isBooked: false
      }));

      slotDoc = await Slot.create({ date, slots: slotsToSave });
    }

    // ✅ Filter and return only available (unbooked) slots
    const availableSlots = slotDoc.slots
      .filter(s => !s.isBooked)
      .map(s => ({
        id: s._id,
        startTime: s.startTime,
        endTime: s.endTime
      }));

    res.status(200).json({ date, slots: availableSlots });

  } catch (err) {
    console.error("❌ Error fetching available slots:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
