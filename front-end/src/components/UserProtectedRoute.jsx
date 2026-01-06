import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from "../utils/auth";
// by default children is understandable by react router
// or if we want other name we can use explicitely method
const UserProtectedRoute = ({ children }) => {
  if (!isUserLoggedIn()) {
    return <Navigate to="/user/login" replace />;
  }
  return children;
};

export default UserProtectedRoute;
