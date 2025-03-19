import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import UserMain from "./pages/UserMain.jsx";
import Favs from "./pages/UserFav.jsx";
import ErrorPage from "./pages/ErrorPage.jsx"; // ✅ Import ErrorPage
import AdminMain from "./pages/AdminMain.jsx";
import BasketForm from "./pages/BasketForm.jsx";
import { BasketContextProvider } from "./context/BasketContext"; // ✅ Use named export
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />, // ✅ Handle invalid routes globally
    children: [
      { index: true, element: <UserMain /> },
      { path: "/favorites", element: <Favs /> },
      { path: "/administrator", element: <AdminMain /> },
      { path: "/administrator/basketform", element: <BasketForm /> },
    ],
  },
  {
    path: "*", // ✅ Catch-all for undefined routes
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BasketContextProvider>
    <RouterProvider router={router} />
  </BasketContextProvider>
);
