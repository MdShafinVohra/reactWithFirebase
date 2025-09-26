import LandingPage from "./LandingPage";
import Products from "./Products";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
]);

export default function Routing() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
