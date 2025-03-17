import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import Nav from "./components/NavTabs";

function App() {
  console.log("🔥 App.jsx is rendering"); // ✅ Check if this logs in the browser

  const [username, setUsername] = useState(localStorage.getItem("username") || ""); 
  const [basketData, setBasketData] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const navigate = useNavigate();

  useEffect(() => {
    console.log("🚀 useEffect in App.jsx is running"); // ✅ Log if the effect runs
    fetch("/api/baskets") 
      .then((response) => response.json())
      .then((data) => {
        console.log("📦 Fetched baskets in App.jsx:", data);
        setBasketData(data);
      })
      .catch((error) => console.error("❌ Error fetching baskets:", error));
  }, []);
  
  // ✅ Redirect Admin
  useEffect(() => {
    if (username.toLowerCase() === "administrator") {
      navigate("/administrator"); // ✅ Navigate to the Admin Page
    }
  }, [username, navigate]);

  return (
    <>
      <Nav username={username} />
      <main className="mx-3">
        <Outlet /> {/* ✅ This tells React Router where to render child pages */}
      </main>
    </>
  );
}

export default App;
