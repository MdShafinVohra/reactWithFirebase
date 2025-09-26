import "./App.css";

// firebase
import { auth } from "./config/firebase";

// hooks and functions
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./Store/authSlice";

import { useSelector } from "react-redux";

// components
import Register from "./components/Register";
import Routing from "./components/Routing";
import LoadingSpinner from "./components/UI/LoadingSpinner";

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
  }, [dispatch]);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {auth.currentUser == null && !isLoggedIn ? (
        <section className="m-auto w-full h-screen flex justify-center items-center">
          <Register />
        </section>
      ) : (
        <Routing />
      )}
    </div>
  );
}

export default App;
