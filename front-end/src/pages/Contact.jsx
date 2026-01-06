import Navbar from "../components/Navbar";

export default function Contact() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <div className="max-w-xl mx-auto p-10">
        <h1 className="text-3xl font-bold text-purple-900 text-center mb-6">
          Contact Us
        </h1>

        <form className="card bg-base-100 shadow-xl p-6 space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="input input-bordered w-full"
          />
          <textarea
            placeholder="Your Message"
            className="textarea textarea-bordered w-full"
          ></textarea>

          <button className="btn btn-primary w-full">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
