import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AdminLogin() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
        role: "admin",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
const handleSubmit = async (e) => {
  e.preventDefault();

  const endpoint =
    form.role === "superadmin"
      ? "http://localhost:5000/admin/superadmin_login"
      : "http://localhost:5000/admin/login";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // ✅ ALWAYS go to the SAME dashboard
    navigate("/admin/dashboard");
  } catch (err) {
    alert("Server error");
  }
};


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
            <Navbar />

            <div className="flex justify-center items-center pt-24">
                <div className="card w-[360px] bg-base-100 shadow-2xl p-8">

                    <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
                        Admin Portal
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="input input-bordered"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="input input-bordered"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />

                        <div className="flex items-center justify-between">
                            <label className="font-medium text-blue-700">
                                Login as:
                            </label>

                            <select
                                name="role"
                                className="select select-bordered"
                                value={form.role}
                                onChange={handleChange}
                            >
                                <option value="admin">Admin</option>
                                <option value="superadmin">Super Admin</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary mt-2">
                            Login
                        </button>
                    </form>

                    <p className="text-xs text-center text-indigo-500 mt-4">
                        © 2025 Dentist Management System
                    </p>
                </div>
            </div>
        </div>
    );
}
