import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { auth } from "../config/firebase";

export default function LandingPage() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      {auth.currentUser != null && isLoggedIn && (
        <>
          <Outlet />
        </>
      )}
    </>
  );
}
