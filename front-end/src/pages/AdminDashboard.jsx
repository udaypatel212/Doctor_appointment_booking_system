import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const API = "http://localhost:5000";

export default function AdminDashboard() {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  // 🔐 Check logged-in admin
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(
          `${API}/admin/me`,
          { withCredentials: true }
        );

        setRole(data.role);
      } catch (err) {
        navigate("/admin/login");
      }
    };

    checkAuth();
  }, [navigate]);

  // 🚪 Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        `${API}/admin/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      // ignore
    }

    localStorage.setItem("adminToken", "");
    localStorage.setItem("admin", "");
    navigate("/");
  };

  // 👤 Create Admin (superadmin only)
  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    const f = e.target;

    try {
      await axios.post(
        `${API}/admin/create`,
        {
          fullname: f.fullname.value,
          email: f.email.value,
          password: f.password.value,
          role: f.role.value,
          specialization: f.specialization.value,
          experience: f.experience.value,
          bio: f.bio.value,
        },
        { withCredentials: true }
      );

      alert("Admin created successfully");
      f.reset();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create admin");
    }
  };

  // ⏱ Generate slots
  const handleGenerateSlots = async (e) => {
    e.preventDefault();
    const f = e.target;

    try {
      await axios.post(
        `${API}/admin/generateSlot`,
        {
          dateStr: f.dateStr.value,
          startHour: f.startHour.value,
          endHour: f.endHour.value,
          durationMin: f.durationMin.value,
        },
        { withCredentials: true }
      );

      alert("Slots generated");
      f.reset();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to generate slots");
    }
  };

  if (!role) {
    return <div className="text-center mt-20">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <header className="bg-gray-800 text-white py-4 text-center text-2xl font-bold">
        Admin Dashboard
      </header>

      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* CREATE ADMIN – SUPERADMIN ONLY */}
        {role === "superadmin" && (
          <div className="card bg-base-100 shadow-xl p-5">
            <h3 className="text-lg font-bold mb-3">ADD DOCTOR</h3>

            <form onSubmit={handleCreateAdmin} className="flex flex-col gap-2">
              <input name="fullname" placeholder="Full Name" className="input input-bordered" required />
              <input name="email" type="email" placeholder="Email" className="input input-bordered" required />
              <input name="password" type="password" placeholder="Password" className="input input-bordered" required />

              <select name="role" className="select select-bordered">
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>

              <input name="specialization" placeholder="Specialization" className="input input-bordered" />
              <input name="experience" placeholder="Experience (e.g. 5 years)" className="input input-bordered" />
              <textarea name="bio" placeholder="Short Bio" className="textarea textarea-bordered" />

              <button className="btn btn-primary">Create Admin</button>
            </form>
          </div>
        )}

        {/* GENERATE SLOTS */}
        <div className="card bg-base-100 shadow-xl p-5">
          <h3 className="text-lg font-bold mb-3">Generate Slots</h3>
          <form onSubmit={handleGenerateSlots} className="flex flex-col gap-2">
            <input type="date" name="dateStr" className="input input-bordered" required />
            <input type="number" name="startHour" placeholder="Start Hour" className="input input-bordered" />
            <input type="number" name="endHour" placeholder="End Hour" className="input input-bordered" />
            <input type="number" name="durationMin" placeholder="Duration (min)" className="input input-bordered" />
            <button className="btn btn-primary">Generate Slots</button>
          </form>
        </div>

        {/* SHOW APPOINTMENTS */}
        <div className="card bg-base-100 shadow-xl p-5">
          <h3 className="text-lg font-bold mb-3">Display Appointments</h3>
          <button
            onClick={() => navigate("/admin/appointments")}
            className="btn btn-primary"
          >
            Show Appointments
          </button>
        </div>

        {/* LOGOUT */}
        <div className="card bg-base-100 shadow-xl p-5">
          <h3 className="text-lg font-bold mb-3">Logout</h3>
          <button onClick={handleLogout} className="btn btn-error">
            Logout
          </button>
        </div>
      </main>

      <footer className="text-center py-4 text-gray-600">
        © 2025 Admin Dashboard
      </footer>
    </div>
  );
}
