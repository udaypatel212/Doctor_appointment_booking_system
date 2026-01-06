import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ShowAppointment from "../components/ShowAppointment";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
    const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Set min & max date
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const minDate = `${yyyy}-${mm}-${dd}`;

    const twoMonthsLater = new Date();
    twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);
    const yyyyMax = twoMonthsLater.getFullYear();
    const mmMax = String(twoMonthsLater.getMonth() + 1).padStart(2, "0");
    const ddMax = String(twoMonthsLater.getDate()).padStart(2, "0");
    const maxDate = `${yyyyMax}-${mmMax}-${ddMax}`;

    document.getElementById("dateInput")?.setAttribute("min", minDate);
    document.getElementById("dateInput")?.setAttribute("max", maxDate);
  }, []);

  // Fetch slots on date change
  const fetchSlots = async (selectedDate) => {
    setSelectedSlotId(null);
    setSlots([]);

    const res = await fetch("http://localhost:5000/user/book_appointment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ date: selectedDate }),
    });


    const data = await res.json();
    if (data.slots) setSlots(data.slots);
    else alert(data.message);
  };

  const handleLogout = async () => {
    await fetch("http://localhost:5000/user/logout", {
      method: "POST",
      credentials: "include",
    });

    navigate("/"); // 👈 React redirect
  };

  // Book appointment
  const bookSlot = async () => {
    if (!selectedSlotId) {
      alert("Please select a slot!");
      return;
    }

    const res = await fetch("http://localhost:5000/user/book_appointment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        ...form,
        date,
        slotId: selectedSlotId,
      }),
    });

    const data = await res.json();
    alert(data.message);

    fetchSlots(date); // refresh slots
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-100">

      <Navbar />

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="fixed bottom-5 right-5 btn btn-warning"
      >
        Logout
      </button>


      {/* Main Card */}
      <main className="max-w-7xl mx-auto mt-24 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT: Booking */}
        <div className="md:col-span-2">
          <div className="card bg-base-100 shadow-2xl p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-orange-600 text-center mb-6">
              Book Your Appointment
            </h2>

            <label className="font-semibold">Select Date:</label>
            <input
              id="dateInput"
              type="date"
              className="input input-bordered mb-4"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                fetchSlots(e.target.value);
              }}
            />

            <div className="flex flex-wrap gap-2 mb-4">
              {slots.map((s) => (
                <button
                  key={s._id}
                  disabled={s.isBooked}
                  onClick={() => setSelectedSlotId(s._id)}
                  className={`flex-1 py-2 rounded-lg font-bold ${s.isBooked
                    ? "bg-yellow-200 text-green-500 cursor-not-allowed"
                    : selectedSlotId === s._id
                      ? "border-2 border-orange-500 bg-green-200"
                      : "bg-green-100 text-green-600"
                    }`}
                >
                  {new Date(s.startTime).toLocaleTimeString()} -{" "}
                  {new Date(s.endTime).toLocaleTimeString()}
                </button>
              ))}
            </div>

            {selectedSlotId && (
              <button
                onClick={bookSlot}
                className="btn btn-primary w-full"
              >
                Book Selected Slot
              </button>
            )}
          </div>
        </div>

        {/* RIGHT: Appointments */}
        <div className="md:col-span-1">
          <div className="card bg-base-100 shadow-xl p-4 rounded-2xl">
            <ShowAppointment endpoint="http://localhost:5000/user/show_appointment" />
          </div>
        </div>

      </main>


      <footer className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-orange-200 px-4 py-2 rounded-xl shadow-lg font-bold">
        © 2025 MyClinic
      </footer>
    </div>
  );
}
