import { useState } from "react";
import Navbar from "../components/Navbar";
import ShowAppointment from "../components/ShowAppointment";
import loadRazorpay from "../utils/loadRazorpay";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BOOKING_AMOUNT = 10;
const API = "http://localhost:5000";

export default function UserDashboard() {
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔐 Logout
  const handleLogout = async () => {
    await axios.post(`${API}/user/logout`, {}, { withCredentials: true });
    localStorage.clear();
    navigate("/");
  };

//   // 📅 Fetch slots ONLY (no booking here)
  const fetchSlots = async (selectedDate) => {
    setSelectedSlotId(null);
    setSlots([]);

    try {
      const { data } = await axios.post(
        `${API}/user/book_appointment`,
        { date: selectedDate },
        { withCredentials: true }
      );

      if (data.slots) setSlots(data.slots);
      else alert(data.message);
    } catch (err) {
      alert("Failed to fetch slots");
    }
  };

  // 💳 Pay & Book
  const payAndBook = async () => {
    if (!date || !selectedSlotId) {
      alert("Please select date and slot");
      return;
    }

    setLoading(true);

    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay SDK failed");
      setLoading(false);
      return;
    }

    try {
      // ✅ 1. Create order (SEND AMOUNT)
      const orderRes = await axios.post(
        `${API}/payment/create-order`,
        { amount: BOOKING_AMOUNT },
        { withCredentials: true }
      );

      const { order } = orderRes.data;

      // ✅ 2. Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        name: "MyClinic",
        description: "Appointment Booking ₹10",

        handler: async (response) => {
          // ✅ 3. Verify payment + book slot
          const verifyRes = await axios.post(
            `${API}/payment/verify-payment`,
            {
              ...response,
              date,
              slotId: selectedSlotId,
            },
            { withCredentials: true }
          );

          alert(verifyRes.data.message);

          setSelectedSlotId(null);
          fetchSlots(date);
          setLoading(false);
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error("Payment Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Payment failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-100">
      <Navbar />

      <button
        onClick={handleLogout}
        className="fixed bottom-5 right-5 btn btn-warning"
      >
        Logout
      </button>

      <main className="max-w-7xl mx-auto mt-24 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="card bg-base-100 shadow-xl p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-orange-600 text-center mb-6">
              Book Appointment
            </h2>

            <label className="font-semibold">Select Date</label>
            <input
              type="date"
              className="input input-bordered w-full mb-4"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                fetchSlots(e.target.value);
              }}
            />

            <div className="flex flex-wrap gap-2 mb-4">
              {slots.map((slot) => (
                <button
                  key={slot._id}
                  disabled={slot.isBooked}
                  onClick={() => setSelectedSlotId(slot._id)}
                  className={`flex-1 py-2 rounded-lg font-bold ${
                    slot.isBooked
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : selectedSlotId === slot._id
                      ? "bg-green-300 border-2 border-green-600"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {new Date(slot.startTime).toLocaleTimeString()} -{" "}
                  {new Date(slot.endTime).toLocaleTimeString()}
                </button>
              ))}
            </div>

            {selectedSlotId && (
              <>
                <p className="text-center font-bold text-green-600 mb-2">
                  Booking Amount: ₹10
                </p>

                <button
                  onClick={payAndBook}
                  disabled={loading}
                  className="btn btn-success w-full"
                >
                  {loading ? "Processing..." : "Pay ₹10 & Book Slot"}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="card bg-base-100 shadow-xl p-4 rounded-2xl">
            <ShowAppointment endpoint={`${API}/user/show_appointment`} />
          </div>
        </div>
      </main>
    </div>
  );
}