import "./App.css";

// firebase
import { auth } from "./config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./config/firebase";

// hooks and functions
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./Store/authSlice";

import Routing from "./components/Routing";
import LoadingSpinner from "./components/UI/LoadingSpinner";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          dispatch(authActions.setUser(userDocSnap.data()));
        } else {
          dispatch(
            authActions.setUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            })
          );
        }
        dispatch(authActions.login());
      } else {
        dispatch(authActions.setUser(null));
        dispatch(authActions.logout());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Routing />
    </div>
  );
}

export default App;
