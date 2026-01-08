const { generateSlots } = require("../utility/generateSlots");
const slotModel = require("../models/slots");
const Appointment = require("../models/appointment");
const { isSunday } = require("../utility/isSunday");

module.exports.book_appointment = async (req, res) => {
  try {
    const { date, slotId } = req.body;
    const user = req.user;

    if (!user)
      return res.status(401).json({ message: "Unauthorized — please login." });

    // 1️⃣ Block Sundays
    if (isSunday(date)) {
      return res.status(200).json({
        message: "Sunday is a holiday — no appointments available.",
        slots: [],
      });
    }

    // 2️⃣ Find or generate slots for selected date
    let slotDoc = await slotModel.findOne({ date });
    if (!slotDoc) {
      const defaultSlots = generateSlots(date, 16, 23, 30);
      slotDoc = await slotModel.create({ date, slots: defaultSlots });
    }

    // 3️⃣ If no slot selected → return available slots
    if (!slotId) {
      const available = slotDoc.slots.filter((s) => !s.isBooked);
      return res.status(200).json({
        message: "Available slots for this date",
        date,
        slots: slotDoc.slots.map((s) => ({
          _id: s._id,
          startTime: s.startTime,
          endTime: s.endTime,
          isBooked: s.isBooked,
        })),
      });
    }

    // 4️⃣ Fetch selected slot
    const slot = slotDoc.slots.id(slotId);
    if (!slot) return res.status(404).json({ message: "Slot not found" });
    if (slot.isBooked)
      return res.status(400).json({ message: "This slot is already booked" });

    // 5️⃣ If user already has a previous appointment → delete it
    if (user.appointment) {
      const prevAppointment = await Appointment.findById(user.appointment);
      if (prevAppointment) {
        await Appointment.deleteOne({ _id: prevAppointment._id });
      }

      // also free the previous slot if exists
      if (user.slot) {
        const oldSlotDoc = await slotModel.findOne({ "slots._id": user.slot });
        if (oldSlotDoc) {
          const oldSlot = oldSlotDoc.slots.id(user.slot);
          if (oldSlot) {
            oldSlot.isBooked = false;
            await oldSlotDoc.save();
          }
        }
      }
    }

    // 6️⃣ Book the new slot
    slot.isBooked = true;
    await slotDoc.save();

    // 7️⃣ Create a new appointment
    const newAppointment = await Appointment.create({
      name: user.name,
      email: user.email,
      appointmentTime: slot.startTime,
      users: [user._id],
    });

    // 8️⃣ Update user document
    user.appointment = newAppointment._id;
    user.slot = slot._id;
    await user.save();
 
    // 9️⃣ Respond success
    return res.status(200).json({
      message: "Appointment booked successfully ✅",
      appointment: {
        user: user.name,
        email: user.email,
        date,
        startTime: slot.startTime,
        endTime: slot.endTime,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};


// Show only appointments of the logged-in user
module.exports.show_appointment = async (req, res) => {
  try {
    const userId = req.user._id;

    const appointments = await Appointment.find({ users: userId })
      .sort({ appointmentTime: 1 });

    return res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
