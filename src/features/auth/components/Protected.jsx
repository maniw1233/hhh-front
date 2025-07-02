import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../AuthSlice";
import { Navigate, useLocation } from "react-router-dom";

export const Protected = ({ children }) => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const location = useLocation();

  if (!loggedInUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Optional: If you want to block verified-only pages, check `isVerified` here
  // if (location.pathname.startsWith("/admin") && !loggedInUser.isAdmin) {
  //   return <Navigate to="/" replace />;
  // }

  return children;
};
