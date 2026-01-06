import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from "../utils/auth";

const PublicRoute = ({ children }) => {
  if (isUserLoggedIn()) {
    return <Navigate to="/user/dashboard" replace />;
  }
  return children;
};

export default PublicRoute;
