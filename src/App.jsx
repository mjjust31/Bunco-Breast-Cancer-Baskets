import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import UserMain from "./pages/UserMain";
import AdminMain from "./pages/AdminMain";  // ✅ Ensure this matches your file name
import Nav from './components/NavTabs';

const initialBasketData = [
  { id: 1, name: "Wine Basket", content: "Red Wine" },
  { id: 2, name: "Coffee Basket", content: "Coffee Beans" },
  { id: 3, name: "Snack Basket", content: "Chips" }
];

function App() {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [basketData, setBasketData] = useState(() => {
    try {
      const savedBaskets = localStorage.getItem("baskets");
      return savedBaskets ? JSON.parse(savedBaskets) : initialBasketData;
    } catch (error) {
      console.error("Error loading baskets:", error);
      return initialBasketData;
    }
  });

  const navigate = useNavigate(); // ✅ For redirecting users

  useEffect(() => {
    if (username.toLowerCase() === "administrator") {
      navigate("/administrator");  // ✅ Updated from `/admin` → `/administrator`
    } else if (username) {
      navigate("/");
    }
  }, [username, navigate]);

  useEffect(() => {
    localStorage.setItem("baskets", JSON.stringify(basketData));
  }, [basketData]);

  return (
    <>
      <Nav />
      <main className="mx-3">
        <Routes>
          <Route path="/" element={<UserMain username={username} setUsername={setUsername} basketData={basketData} setBasketData={setBasketData} />} />
          <Route path="/administrator" element={<AdminMain username={username} setUsername={setUsername} basketData={basketData} setBasketData={setBasketData} />} />  {/* ✅ Updated Path */}
        </Routes>
      </main>
    </>
  );
}

export default App;
