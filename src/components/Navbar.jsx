import { auth } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../Store/authSlice";
import { Link } from "react-router-dom";
import ProfileImage from "./UI/ProfileImage";

export default function Navbar({ isLoggedIn }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const profilePic = user?.photoURL;
  const displayName = user?.displayName || user?.email;

  return (
    <header className="w-full bg-slate-50 border-b border-slate-200 shadow-md">
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo/Brand */}
        <Link to="/" className="flex items-center gap-2">
          <span className="bg-indigo-600 text-white rounded-full px-3 py-1 font-bold text-lg shadow-md font-header">ZI</span>
          <span className="ml-2 text-slate-700 font-body font-semibold text-base tracking-wide">Electricals</span>
        </Link>

        {/* Core Navigation */}
        <div className="flex items-center gap-8">
          <Link to="/products" className="text-slate-700 hover:text-indigo-600 font-body font-medium transition-all duration-150">
            Shop
          </Link>
          <Link to="/about" className="text-slate-700 hover:text-indigo-600 font-body font-medium transition-all duration-150">
            About
          </Link>
          <Link to="/contact" className="text-slate-700 hover:text-indigo-600 font-body font-medium transition-all duration-150">
            Contact
          </Link>
        </div>

        {isLoggedIn && auth.currentUser ? (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <ProfileImage src={profilePic} alt="Profile" displayName={displayName} />
              <span className="text-slate-900 font-medium font-body">{displayName}</span>
              <Link
                to="/wishlist"
                className="border border-lime-500 text-lime-600 hover:bg-lime-50 rounded-full px-3 py-1 font-body transition-all duration-150">
                Wishlist
              </Link>
              <Link
                to="/cart"
                className="border border-amber-400 text-amber-600 hover:bg-amber-50 rounded-full px-3 py-1 font-body transition-all duration-150">
                Cart
              </Link>
            </div>
            <button
              onClick={() => dispatch(logOut())}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full px-4 py-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-lime-500 shadow">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/compare"
              className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold rounded-full px-4 py-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-lime-500">
              Compare Products
            </Link>
            <Link
              to="/deals"
              className="border border-lime-500 text-lime-600 hover:bg-lime-50 font-semibold rounded-full px-4 py-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-lime-500">
              Deals
            </Link>
            <Link
              to="/login"
              className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold rounded-full px-4 py-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-lime-500">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-lime-500 hover:bg-lime-600 text-slate-900 font-semibold rounded-full px-4 py-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-lime-500">
              Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
