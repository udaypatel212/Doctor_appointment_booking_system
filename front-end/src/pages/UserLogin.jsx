import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function UserLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/user/login",
        { email, phone },
        { withCredentials: true }
      );

      if (res.data.success) {
        navigate("/user/dashboard"); // 👈 FRONTEND REDIRECT
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <Navbar />

      <div className="flex justify-center items-center pt-24">
        <div className="card w-[350px] bg-base-100 shadow-xl p-8">

          <h1 className="text-2xl font-bold text-blue-700 text-center mb-4">
            User Login
          </h1>

          {error && (
            <div className="alert alert-error mb-3 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Phone"
              className="input input-bordered"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>

          <button
            onClick={() => navigate("/user/register")}
            className="btn btn-outline btn-primary mt-4"
          >
            Register
          </button>

        </div>
      </div>
    </div>
  );
}
