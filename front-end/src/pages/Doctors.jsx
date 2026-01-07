import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const FALLBACK_IMAGE =
  "https://cdn-icons-png.flaticon.com/512/387/387561.png";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:5000/admin/doctors");
        const data = await res.json();

        if (res.ok) {
          setDoctors(data.doctors);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Loading doctors...</div>;
  }

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-3xl font-bold text-purple-900 text-center mb-4">
          Our Doctors
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Meet our experienced and compassionate medical professionals
        </p>

        {doctors.length === 0 ? (
          <p className="text-center text-gray-500">No doctors found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {doctors.map((doc) => (
              <div
                key={doc._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition"
              >
                <figure className="px-6 pt-6">
                  <img
                    src={doc.image || FALLBACK_IMAGE}
                    alt={doc.fullname}
                    className="rounded-xl h-36 w-36 object-cover"
                  />
                </figure>

                <div className="card-body text-center">
                  <h2 className="card-title justify-center text-purple-800">
                    {doc.fullname}
                  </h2>

                  <p className="text-sm text-indigo-600 font-semibold">
                    {doc.specialization || "General Physician"}
                  </p>

                  <p className="text-gray-600 text-sm mt-2">
                    {doc.bio || "No bio available"}
                  </p>

                  <div className="mt-4 text-sm text-gray-700">
                    <p>
                      <span className="font-semibold">Experience:</span>{" "}
                      {doc.experience || "N/A"}
                    </p>
                  </div>

                  <div className="card-actions justify-center mt-6">
                    <button className="btn btn-primary btn-sm">
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
