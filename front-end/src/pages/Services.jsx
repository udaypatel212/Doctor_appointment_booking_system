import Navbar from "../components/Navbar";

export default function Services() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-3xl font-bold text-purple-900 text-center mb-8">
          Our Services
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Dental Care", "General Checkup", "Emergency Care"].map(
            (service, i) => (
              <div key={i} className="card bg-base-100 shadow-xl">
                <div className="card-body text-center">
                  <h2 className="card-title justify-center">
                    {service}
                  </h2>
                  <p className="text-gray-600">
                    Professional and affordable healthcare services.
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
