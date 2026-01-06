import Navbar from "../components/Navbar";
import doctorData from "../data/doctorData";

export default function Doctors() {
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {doctorData.map((doc) => (
            <div
              key={doc.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition"
            >
              <figure className="px-6 pt-6">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="rounded-xl h-36 w-36 object-cover"
                />
              </figure>

              <div className="card-body text-center">
                <h2 className="card-title justify-center text-purple-800">
                  {doc.name}
                </h2>

                <p className="text-sm text-indigo-600 font-semibold">
                  {doc.specialization}
                </p>

                <p className="text-gray-600 text-sm mt-2">
                  {doc.bio}
                </p>

                <div className="mt-4 text-sm text-gray-700">
                  <p>
                    <span className="font-semibold">Experience:</span>{" "}
                    {doc.experience}
                  </p>
                  <p>
                    <span className="font-semibold">Available:</span>{" "}
                    {doc.availability}
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
      </div>
    </div>
  );
}
