import LandingPage from "./LandingPage";
import Login from "./Login";
import Products from "./Products";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Register";

// Browser Routing Functionality
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [
      {
        index: true,
        path: "products",
        element: <Products />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default function Routing() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
