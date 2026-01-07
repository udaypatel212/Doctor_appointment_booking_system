import React from "react";
import Navbar from "../components/Navbar";

export default function HOME() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-purple-100">

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Left Content */}
          <div className="bg-base-100 shadow-2xl rounded-2xl px-10 py-10 text-center">
            <h1 className="text-4xl font-bold text-purple-900 mb-4">
              Welcome to MyClinic
            </h1>

            <p className="text-gray-600 mb-4">
              Your trusted healthcare partner for quality and compassionate
              medical care.
            </p>

            <p className="italic text-purple-700 mb-6">
              “Good health starts with great care.”
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/admin/login" className="btn btn-primary">
                Admin Panel
              </a>
              <a href="/user/login" className="btn btn-outline btn-primary">
                User Panel
              </a>
            </div>
          </div>

          {/* Right Cartoon Hospital Image */}
          <div className="flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2967/2967350.png"
              alt="Cartoon Hospital"
              className="w-80 h-80 animate-pulse"
            />
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-purple-900 text-purple-100 py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">

          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-3">MyClinic</h3>
            <p>
              Caring for life with compassion, trust, and medical excellence.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-3">Contact Information</h3>
            <p>📍 MP Nagar, Zone II</p>
            <p>In front of Asian Paints, Bhopal</p>
            <p>📞 +91 7555XXXX12</p>
            <p>✉️ support@myclinic.com</p>
          </div>

          {/* Timings & Map */}
          <div>
            <h3 className="font-bold text-lg mb-3">Clinic Hours</h3>
            <p>🕘 Mon – Sat</p>
            <p>9:00 AM – 8:00 PM</p>

            <a
              href="https://maps.google.com/?q=MP+Nagar+Zone+II+Bhopal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-purple-300 hover:underline"
            >
              📍 View on Google Maps
            </a>
          </div>

        </div>

        <div className="text-center mt-8 text-purple-300 text-sm">
          © 2025 MyClinic • Caring for Life
        </div>
      </footer>

    </div>
  );
}
