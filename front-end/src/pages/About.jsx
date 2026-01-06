import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-10 text-center">
        <h1 className="text-3xl font-bold text-purple-900 mb-4">
          About MyClinic
        </h1>

        <p className="text-gray-600 leading-relaxed">
          MyClinic is dedicated to providing high-quality healthcare services
          with experienced doctors, modern facilities, and patient-first care.
        </p>
      </div>
    </div>
  );
}
