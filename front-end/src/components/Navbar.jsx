import { NavLink, useNavigate } from "react-router-dom";
import { isUserLoggedIn, isAdminLoggedIn } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-yellow-300 font-semibold"
      : "text-white hover:text-yellow-300 transition";

  const handleHomeClick = () => {
    // 🔴 Admin logged in → admin dashboard
    if (isAdminLoggedIn()) {
      navigate("/admin/dashboard");
      return;
    }

    // 🔴 User logged in → user dashboard
    if (isUserLoggedIn()) {
      navigate("/user/dashboard");
      return;
    }

    // ✅ Not logged in → public home
    navigate("/");
  };

  return (
    <div className="navbar bg-purple-700 px-6 lg:px-12 shadow-md sticky top-0 z-50">
      {/* Logo / Home */}
      <div className="flex-1">
        <button
          onClick={handleHomeClick}
          className="text-2xl font-bold text-white cursor-pointer"
        >
          MyClinic
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex">
        <ul className="menu menu-horizontal gap-2 text-white font-medium">
          <li>
            <button
              onClick={handleHomeClick}
              className={linkClass}
            >
              Home
            </button>
          </li>
          <li>
            <NavLink to="/about" className={linkClass}>
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className={linkClass}>
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/gallery" className={linkClass}>
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink to="/doctors" className={linkClass}>
              Doctors
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={linkClass}>
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
