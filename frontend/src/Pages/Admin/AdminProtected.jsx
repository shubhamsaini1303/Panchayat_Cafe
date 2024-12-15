/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtected = ({ children }) => {
  const admin = useSelector((store) => store.admin.data);

  if (!admin) {
    // Redirect to login page if user is not authenticated
    return <Navigate to={`${import.meta.env.VITE_ADMIN_BASE_URL}/login`} replace />;
  }

  // Render the children components if user is authenticated
  return children;
};

export default AdminProtected;
