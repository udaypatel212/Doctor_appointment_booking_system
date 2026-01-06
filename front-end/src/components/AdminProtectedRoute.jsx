import { Navigate } from "react-router-dom";
import { isAdminLoggedIn } from "../utils/auth";

const AdminProtectedRoute = ({ children }) => {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default AdminProtectedRoute;
