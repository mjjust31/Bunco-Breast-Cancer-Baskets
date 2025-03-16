import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import UserMain from "./pages/UserMain";
import AdminMain from "./pages/AdminMain";
import Favs from "./pages/UserFav"; // Import UserFav component
import Nav from "./components/NavTabs";

function App() {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  ); // Always a string
  const [basketData, setBasketData] = useState(() => {
    try {
      const savedBaskets = localStorage.getItem("baskets");
      return savedBaskets ? JSON.parse(savedBaskets) : [];
    } catch (error) {
      console.error("Error loading baskets:", error);
      return [];
    }
  });

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (username.toLowerCase() === "administrator") {
      navigate("/administrator");
    }
  }, [username, navigate]); // Only run if username changes

  useEffect(() => {
    localStorage.setItem("baskets", JSON.stringify(basketData)); // Save basket data to localStorage
  }, [basketData]);

  return (
    <>
      <Nav username={username} /> {/* Pass username to Nav */}
      <main className="mx-3">
        <Routes>
          <Route
            path="/"
            element={
              <UserMain
                username={username}
                setUsername={setUsername}
                basketData={basketData}
                favorites={favorites}
                setBasketData={setBasketData}
              />
            }
          />
          <Route
            path="/administrator"
            element={
              <AdminMain
                username={username}
                setUsername={setUsername}
                basketData={basketData}
                setBasketData={setBasketData}
              />
            }
          />
          {/* Now importing UserFav for /favorites route */}
          <Route
            path="/favorites"
            element={<Favs favorites={favorites} basketData={basketData} />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
