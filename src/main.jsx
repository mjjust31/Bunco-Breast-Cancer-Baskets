import React from "react";
import ReactDOM from "react-dom/client";
// Bringing in the required imports from 'react-router-dom' to set up application routing behavior
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//import pages
import App from "./App.jsx";
import Main from "./pages/UserMain.jsx";
import Favs from "./pages/UserFav.jsx";
import AdminMain from "./pages/AdminMain.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
//inmport css
import "./index.css";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "/favorites",
        element: <Favs />,
      },
      { path: "/administrator", element: <AdminMain /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
