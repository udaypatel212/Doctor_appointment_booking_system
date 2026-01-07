import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function UserRegister() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "/user/register",
        { name, email, phone }
      );

      if (res.data.success) {
        setSuccess("Registration successful! Redirecting...");
        setTimeout(() => {
          navigate("/user/login"); // 👈 FRONTEND REDIRECT
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <Navbar />

      <div className="flex justify-center items-center pt-24">
        <div className="card w-[360px] bg-base-100 shadow-xl p-8">

          <h1 className="text-2xl font-bold text-blue-700 text-center mb-4">
            User Registration
          </h1>

          {error && (
            <div className="alert alert-error text-sm mb-3">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success text-sm mb-3">
              {success}
            </div>
          )}

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

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
              Register
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/user/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
