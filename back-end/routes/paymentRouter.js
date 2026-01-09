const express = require("express");
const router = express.Router();
const razorpay = require("../utility/razorpay");
const crypto = require("crypto");
const Payment = require("../models/paymentModal");
const Appointment = require("../models/appointment");
const slotModel = require("../models/slots");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const sendMail = require("../utility/sendMail");

// CREATE ORDER
router.post("/create-order", isLoggedIn, async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// VERIFY PAYMENT + BOOK SLOT
router.post("/verify-payment", isLoggedIn, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      date,
      slotId,
    } = req.body;

    const user = req.user;

    // 1️⃣ Verify Razorpay signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // 2️⃣ Find existing slot document (NO GENERATION)
    const slotDoc = await slotModel.findOne({ date });
    if (!slotDoc) {
      return res.status(404).json({ message: "Slots not found for this date" });
    }

    // 3️⃣ Fetch selected slot
    const slot = slotDoc.slots.id(slotId);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }
    if (slot.isBooked) {
      return res.status(400).json({ message: "This slot is already booked" });
    }

    // 4️⃣ Remove previous appointment (OLD LOGIC)
    if (user.appointment) {
      const prevAppointment = await Appointment.findById(user.appointment);
      if (prevAppointment) {
        await Appointment.deleteOne({ _id: prevAppointment._id });
      }

      // free previous slot
      if (user.slot) {
        const oldSlotDoc = await slotModel.findOne({
          "slots._id": user.slot,
        });

        if (oldSlotDoc) {
          const oldSlot = oldSlotDoc.slots.id(user.slot);
          if (oldSlot) {
            oldSlot.isBooked = false;
            await oldSlotDoc.save();
          }
        }
      }
    }

    // 5️⃣ Book the new slot
    slot.isBooked = true;
    await slotDoc.save();

    // 6️⃣ Save payment
    await Payment.create({
      userId: user._id,
      paymentId: razorpay_payment_id,
      amount: 10,
    });

    // 7️⃣ Create appointment (UNCHANGED SCHEMA)
    const newAppointment = await Appointment.create({
      name: user.name,
      email: user.email,
      appointmentTime: slot.startTime,
      users: [user._id],
    });
    try {
      await sendMail({
        to: user.email,
        subject: "Appointment Confirmed ✅",
        html: `
      <h2>Appointment Booked Successfully</h2>
      <p>Hi <strong>${user.name}</strong>,</p>
  
      <p>Your appointment has been successfully booked.</p>
  
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${new Date(slot.startTime).toLocaleTimeString()}</p>
      <p><strong>Amount Paid:</strong> ₹10</p>
  
      <p>Thank you for choosing <strong>MyClinic</strong>.</p>
  
      <br/>
      <p>Regards,<br/>MyClinic Team</p>
    `,
      });

    } catch (error) {
      console.error("Email failed but booking succeeded");
    }

    // 8️⃣ Link appointment & slot to user
    user.appointment = newAppointment._id;
    user.slot = slot._id;
    await user.save();

    // 9️⃣ Response
    return res.status(200).json({
      message: "Payment successful & appointment booked ✅",
      appointment: {
        user: user.name,
        email: user.email,
        date,
        startTime: slot.startTime,
        endTime: slot.endTime,
      },
    });
  } catch (err) {
    console.error("Verify Payment Error:", err);
    return res.status(500).json({
      message: "Internal Server Error during payment verification",
    });
  }
});

module.exports = router;
