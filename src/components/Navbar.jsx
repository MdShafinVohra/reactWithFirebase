import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/authSlice";

export default function Navbar({ isLoggedIn }) {
  // Redux Related
  const dispatch = useDispatch();
  //

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(authActions.logout());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="w-full p-4 bg-slate-500">
      <nav className="flex justify-between">
        {isLoggedIn && auth.currentUser && (
          <div>
            <img className="rounded w-12" src={auth.currentUser.photoURL} alt="Profile Pic" />
          </div>
        )}

        {isLoggedIn && auth.currentUser && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
}
