import { useRef } from "react";
import { useDispatch } from "react-redux";
import { loginWithEmailAndPassword, signInWithGoogle } from "../Store/authSlice";

export default function Login() {
  const email = useRef();
  const pass = useRef();

  const dispatch = useDispatch();

  return (
    <div className="flex flex-col justify-between h-72 w-full max-w-md bg-surface rounded-lg shadow-lg border border-slate-200 px-8 py-6 items-center">
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
      <button
        className="rounded-full bg-indigo-600 text-white w-full py-2 font-heading font-semibold shadow-md hover:bg-indigo-700 transition-all duration-150 mb-2"
        onClick={() => {
          dispatch(loginWithEmailAndPassword({ email: email.current.value, password: pass.current.value }));
        }}>
        Login
      </button>

      <button
        className="rounded-full border border-indigo-600 text-indigo-600 w-full py-2 font-heading font-medium shadow-sm hover:bg-indigo-50 transition-all duration-150"
        onClick={() => {
          dispatch(signInWithGoogle());
        }}>
        Sign In With Google
      </button>
    </div>
  );
}
