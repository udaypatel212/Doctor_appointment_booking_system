import { Navigate } from "react-router-dom";
import { isUserLoggedIn, isAdminLoggedIn } from "../utils/auth";

const PublicRoute = ({ children }) => {
  // 🔴 If ADMIN is logged in → go to admin dashboard
  if (isAdminLoggedIn()) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // 🔴 If USER is logged in → go to user dashboard
  if (isUserLoggedIn()) {
    return <Navigate to="/user/dashboard" replace />;
  }

  // ✅ No one logged in → allow access
  return children;
};

export default PublicRoute;
