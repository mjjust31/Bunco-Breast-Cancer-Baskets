import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Nav from './components/NavTabs';
import basketData from "./data/basketsData"; // ✅ Import basketData from separate file

function App() {
  const [favorites, setFavorites] = useState(() => {
    // ✅ Load favorites from local storage on startup
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // ✅ Save favorites to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <>
      <Nav />
      <main className="mx-3">
        {/* ✅ Pass basketData and favorites to child components */}
        <Outlet context={{ favorites, setFavorites, basketData }} />
      </main>
    </>
  );
}

export default App;
