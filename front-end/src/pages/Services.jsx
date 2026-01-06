import Navbar from "../components/Navbar";

const services = [
  {
    title: "Dental Care",
    description:
      "Comprehensive dental services including cleaning, fillings, root canal, and cosmetic dentistry.",
    features: ["Teeth Cleaning", "Root Canal", "Cosmetic Dentistry"],
    availability: "Mon - Sat",
  },
  {
    title: "General Checkup",
    description:
      "Routine health checkups to monitor overall wellness and detect early health issues.",
    features: ["Blood Pressure", "Sugar Test", "BMI Analysis"],
    availability: "All Days",
  },
  {
    title: "Emergency Care",
    description:
      "24/7 emergency medical services for immediate and critical healthcare needs.",
    features: ["Trauma Care", "ICU Support", "Ambulance Service"],
    availability: "24 x 7",
  },
  {
    title: "Pediatric Care",
    description:
      "Specialized healthcare services focused on infants, children, and adolescents.",
    features: ["Vaccination", "Growth Monitoring", "Child Nutrition"],
    availability: "Mon - Fri",
  },
  {
    title: "Diagnostic Services",
    description:
      "Advanced diagnostic tests with accurate and fast reporting facilities.",
    features: ["Blood Tests", "X-Ray", "ECG & Ultrasound"],
    availability: "Mon - Sat",
  },
  {
    title: "Physiotherapy",
    description:
      "Rehabilitation services for pain relief, mobility improvement, and injury recovery.",
    features: ["Joint Therapy", "Post-Surgery Rehab", "Sports Injury"],
    availability: "Tue - Sun",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-3xl font-bold text-purple-900 text-center mb-4">
          Our Services
        </h1>

        <p className="text-center text-gray-600 mb-10">
          High-quality medical services tailored to your healthcare needs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition"
            >
              <div className="card-body">
                <h2 className="card-title text-purple-800">
                  {service.title}
                </h2>

                <p className="text-gray-600 text-sm mt-2">
                  {service.description}
                </p>

                <ul className="mt-4 text-sm text-gray-700 list-disc list-inside">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>

                <p className="mt-4 text-sm">
                  <span className="font-semibold text-purple-700">
                    Availability:
                  </span>{" "}
                  {service.availability}
                </p>

                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary btn-sm">
                    Learn More
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
