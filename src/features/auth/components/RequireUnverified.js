// src/features/auth/components/RequireUnverified.js

import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../AuthSlice";

export const RequireUnverified = ({ children }) => {
  const loggedInUser = useSelector(selectLoggedInUser);

  if (!loggedInUser) {
    // User not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  if (loggedInUser?.isVerified) {
    // User already verified, redirect to homepage
    return <Navigate to="/" />;
  }

  // User is logged in but not verified, allow access
  return children;
};
