import React from "react";
import Navbar from "../components/Navbar";
export default function HOME() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-100">

      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="card bg-base-100 shadow-2xl rounded-2xl px-10 py-8 text-center">

          <h1 className="text-3xl font-bold text-purple-900 mb-6">
            Welcome to MyClinic
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/admin/login" className="btn btn-primary">
              Admin Panel
            </a>
            <a href="/user/login" className="btn btn-primary">
              User Panel
            </a>

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-purple-900">
        © 2025 MyClinic
      </footer>

    </div>
  );
}
