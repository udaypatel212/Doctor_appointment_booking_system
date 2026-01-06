import Navbar from "../components/Navbar";

const galleryImages = [
  {
    id: 1,
    title: "Clinic Reception",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
  },
  {
    id: 2,
    title: "Waiting Area",
    image: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0",
  },
  {
    id: 3,
    title: "Doctor Consultation Room",
    image: "https://images.unsplash.com/photo-1580281657527-47b29b40a4c3",
  },
  {
    id: 4,
    title: "Dental Treatment Room",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
  },
  {
    id: 5,
    title: "Medical Laboratory",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
  },
  {
    id: 6,
    title: "Emergency Care Unit",
    image: "https://images.unsplash.com/photo-1576765607924-3f7b8410a787",
  },
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-3xl font-bold text-purple-900 text-center mb-4">
          Clinic Gallery
        </h1>

        <p className="text-center text-gray-600 mb-10">
          A glimpse of our modern facilities, advanced equipment, and
          patient-friendly environment
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryImages.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover transform group-hover:scale-105 transition duration-300"
              />

              <div className="bg-white p-3 text-center">
                <p className="font-medium text-purple-800">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
