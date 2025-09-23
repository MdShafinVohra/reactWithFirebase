import { useRef } from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/authSlice";

export default function Register() {
  const email = useRef();
  const pass = useRef();

  // Redux Related
  const dispatch = useDispatch();
  //

  const handleLogin = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email.current.value, pass.current.value);
      dispatch(authActions.login());
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      dispatch(authActions.login());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col justify-around h-48 w-1/2 bg-gray-100 rounded p-8 items-center">
      <input className="border-2 rounded w-2/3" ref={email} type="email" />
      <input className="border-2 rounded w-2/3" ref={pass} type="password" />
      <button className="rounded bg-green-700 text-white w-32 py-2" onClick={handleLogin}>
        Register
      </button>

      <button onClick={handleSignInWithGoogle}>Sign In With Google</button>
    </div>
  );
}
