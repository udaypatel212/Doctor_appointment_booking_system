import { Navigate } from "react-router-dom";
import { isUserLoggedIn, isAdminLoggedIn } from "../utils/auth";

const PublicAdminRoute = ({ children }) => {
  // 🔴 If USER is logged in → block admin login
  if (isUserLoggedIn()) {
    return <Navigate to="/user/dashboard" replace />;
  }

  // 🔴 If ADMIN already logged in → go to admin dashboard
  if (isAdminLoggedIn()) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // ✅ No one logged in → allow admin login
  return children;
};

export default PublicAdminRoute;
