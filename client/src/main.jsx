import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import pages
import App from "./App.jsx";
import UserMain from "./pages/UserMain.jsx";
import Favs from "./pages/UserFav.jsx";
import AdminMain from "./pages/AdminMain.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import "./index.css";
import BasketForm from "./pages/BasketForm.jsx";

// console.log("🚀 main.jsx is running!"); // ✅ Log to check if main.jsx runs

const router = createBrowserRouter([
  {
    path: "/", // Base route for the app
    element: <App />, // Renders the App component
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, // This renders the Main component at "/"
        element: <UserMain />,
      },
      {
        path: "/favorites", // This renders the Favs component at "/favorites"
        element: <Favs />,
      },
      {
        path: "/administrator", // This renders the AdminMain component at "/administrator"
        element: <AdminMain />,
      },
      { path: "/administrator/basketform", element: <BasketForm /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
