import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

const ProtectedRoute = () => {
  const user = useContext(UserContext);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
