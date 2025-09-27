import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerWithEmailAndPassword, signInWithGoogle } from "../Store/authSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const email = useRef();
  const pass = useRef();
  const displayName = useRef();
  const photoURL = useRef();
  const phoneNumber = useRef();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleRegister = async () => {
    try {
      await dispatch(
        registerWithEmailAndPassword({
          email: email.current.value,
          password: pass.current.value,
          displayName: displayName.current.value,
          photoURL: photoURL.current.value,
          phoneNumber: phoneNumber.current.value,
        })
      ).unwrap();
      navigate("/");
    } catch (err) {
      console.log("Register failed: ", err.message);
    }
  };

  const handleRegisterWithGoogle = async () => {
    await dispatch(signInWithGoogle()).unwrap();
    navigate("/");
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  });

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-between h-auto w-full max-w-md bg-surface rounded-lg shadow-lg border border-slate-200 px-8 py-6 items-center">
        <input
          className="border border-slate-300 rounded-lg w-full mt-2 mb-3 px-4 py-2 text-text-primary font-body focus:border-indigo-500 focus:ring-2 focus:ring-lime-500 transition-all duration-150 outline-none"
          ref={email}
          type="email"
          placeholder="Email"
        />
        <input
          className="border border-slate-300 rounded-lg w-full mb-3 px-4 py-2 text-text-primary font-body focus:border-indigo-500 focus:ring-2 focus:ring-lime-500 transition-all duration-150 outline-none"
          ref={pass}
          type="password"
          placeholder="Password"
        />
        <input
          className="border border-slate-300 rounded-lg w-full mb-3 px-4 py-2 text-text-primary font-body focus:border-indigo-500 focus:ring-2 focus:ring-lime-500 transition-all duration-150 outline-none"
          ref={displayName}
          type="text"
          placeholder="Display Name"
        />
        <input
          className="border border-slate-300 rounded-lg w-full mb-3 px-4 py-2 text-text-primary font-body focus:border-indigo-500 focus:ring-2 focus:focus:ring-lime-500 transition-all duration-150 outline-none"
          ref={photoURL}
          type="text"
          placeholder="Photo URL"
        />
        <input
          className="border border-slate-300 rounded-lg w-full mb-3 px-4 py-2 text-text-primary font-body focus:border-indigo-500 focus:ring-2 focus:ring-lime-500 transition-all duration-150 outline-none"
          ref={phoneNumber}
          type="tel"
          placeholder="Phone Number"
        />
        <button
          className="rounded-full bg-indigo-600 text-white w-full py-2 font-heading font-semibold shadow-md hover:bg-indigo-700 transition-all duration-150 mb-2"
          onClick={handleRegister}>
          Register
        </button>

        <button
          className="rounded-full border border-indigo-600 text-indigo-600 bg-white w-full py-2 font-heading font-medium shadow-sm hover:bg-indigo-50 transition-all duration-150"
          onClick={handleRegisterWithGoogle}>
          Sign In With Google
        </button>

        <Link to="/login">Already have an Account?</Link>
      </div>
    </div>
  );
}
