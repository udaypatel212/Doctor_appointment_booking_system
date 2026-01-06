import HOME from "./pages/HOME"
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Doctors from "./pages/Doctors";
import Contact from "./pages/Contact";
import UserLogin from "./pages/UserLogin";
import UserDashboard from "./pages/UserDashboard";
import UserRegister from "./pages/UserRegister";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAppointments from "./pages/AdminAppointments";
import UserProtectedRoute from "./components/UserProtectedRoute";
import PublicRoute from "./components/PublicRoute";



function App() {
  return (
    <Routes>
      <Route path="/" element={<HOME />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/contact" element={<Contact />} />



      <Route path="/user/login" element={<PublicRoute> <UserLogin /></PublicRoute>} />
      <Route path="/user/dashboard" element={<UserProtectedRoute><UserDashboard /></UserProtectedRoute>} />
      <Route path="/user/register" element={<PublicRoute><UserRegister /></PublicRoute>} />
      
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/appointments" element={<AdminAppointments />} />

    </Routes>
  )
}

export default App
