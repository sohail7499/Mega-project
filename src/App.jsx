import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch(() => dispatch(logout()))
      .finally(() => setloading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-col bg-gray-400">
      <div className="flex-1">
        <Header />
        TODO: <Outlet />
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
