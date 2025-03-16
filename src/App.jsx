import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import UserMain from "./pages/UserMain";
import AdminMain from "./pages/AdminMain";
import Nav from './components/NavTabs';

function App() {
  const [username, setUsername] = useState(localStorage.getItem("username") || ""); // ✅ Always a string
  const [basketData, setBasketData] = useState(() => {
    try {
      const savedBaskets = localStorage.getItem("baskets");
      return savedBaskets ? JSON.parse(savedBaskets) : [];
    } catch (error) {
      console.error("Error loading baskets:", error);
      return [];
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (username.toLowerCase() === "administrator") {
      navigate("/administrator");
    } else if (username) {
      navigate("/");
    }
  }, [username, navigate]);

  useEffect(() => {
    localStorage.setItem("baskets", JSON.stringify(basketData));
  }, [basketData]);

  return (
    <>
      <Nav username={username} /> {/* ✅ Pass username to Nav */}
      <main className="mx-3">
        <Routes>
          <Route 
            path="/" 
            element={<UserMain username={username} setUsername={setUsername} basketData={basketData} setBasketData={setBasketData} />} 
          />
          <Route 
            path="/administrator" 
            element={<AdminMain username={username} setUsername={setUsername} basketData={basketData} setBasketData={setBasketData} />} 
          />
          <Route 
            path="/Favorites" 
            element={<AdminMain username={username} setUsername={setUsername} basketData={basketData} setBasketData={setBasketData} />} 
          />

        </Routes>
      </main>
    </>
  );
}

export default App;
