import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, authentication = true }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoading(false);
  }, [authStatus, navigate, authentication]);
  return loading ? <h2>Loading....</h2> : <>{children}</>;
}

export default AuthLayout;

// useEffect(() => {
// Authentication check karta hai aur user ko redirect karta hai.
//
// 1. authentication = true
//    → Page protected hai.
//    → Agar authStatus true nahi hai,
//      user ko /login par bhej do.
//
// 2. authentication = false
//    → Page guest-only hai (Login/Signup).
//    → Agar user already logged in hai,
//      user ko / par bhej do.
//
// 3. Dependency array
//    → authStatus, authentication ya navigate change hone par
//      useEffect dobara run hota hai.
// }, [authStatus, navigate, authentication]);
