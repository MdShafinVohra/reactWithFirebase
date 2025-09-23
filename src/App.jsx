import "./App.css";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import { useEffect, useState } from "react";
import { auth } from "./config/firebase";
import { useDispatch } from "react-redux";
import { authActions } from "./Store/authSlice";
import { useSelector } from "react-redux";
import LandingPage from "./components/LandingPage";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Firebase provides a listener that runs whenever auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(authActions.login());
      } else {
        dispatch(authActions.logout());
      }

      setLoading(false);
    });

    // Cleanup listener when component unmounts
    return () => unsubscribe();
  }, []);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      {auth.currentUser == null ? (
        <section className="m-auto w-full h-screen flex justify-center items-center">
          <Register />
        </section>
      ) : (
        <LandingPage />
      )}
    </div>
  );
}

export default App;
