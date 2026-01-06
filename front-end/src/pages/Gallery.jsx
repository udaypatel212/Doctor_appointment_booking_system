import Navbar from "../components/Navbar";

export default function Gallery() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-3xl font-bold text-purple-900 text-center mb-8">
          Clinic Gallery
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-purple-100 rounded-xl h-40 flex items-center justify-center text-purple-700 font-semibold"
            >
              Image {i}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
