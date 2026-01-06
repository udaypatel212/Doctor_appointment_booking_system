import Navbar from "../components/Navbar";

export default function Doctors() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-3xl font-bold text-purple-900 text-center mb-8">
          Our Doctors
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Dr. Sharma", "Dr. Patel", "Dr. Mehta"].map((doc, i) => (
            <div key={i} className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <div className="avatar justify-center">
                  <div className="w-24 rounded-full bg-purple-200"></div>
                </div>
                <h2 className="card-title justify-center mt-4">
                  {doc}
                </h2>
                <p className="text-gray-600">
                  Specialist with 10+ years experience
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
