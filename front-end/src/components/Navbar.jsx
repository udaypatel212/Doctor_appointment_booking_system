import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-yellow-300 font-semibold"
      : "text-white hover:text-yellow-300 transition";

  return (
    <div className="navbar bg-purple-700 px-6 lg:px-12 shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-white">
          MyClinic
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex">
        <ul className="menu menu-horizontal gap-2 text-white font-medium">
          <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
          <li><NavLink to="/about" className={linkClass}>About Us</NavLink></li>
          <li><NavLink to="/services" className={linkClass}>Services</NavLink></li>
          <li><NavLink to="/gallery" className={linkClass}>Gallery</NavLink></li>
          <li><NavLink to="/doctors" className={linkClass}>Doctors</NavLink></li>
          <li><NavLink to="/contact" className={linkClass}>Contact Us</NavLink></li>
        </ul>
      </div>
    </div>
  );
}
