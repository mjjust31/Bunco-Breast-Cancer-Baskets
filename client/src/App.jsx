import React, { useState, useEffect, createContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import Nav from "./components/NavTabs";

// 🔹 Create Context
export const BasketContext = createContext();

function App() {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [basketData, setBasketData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/baskets") 
      .then((response) => response.json())
      .then((data) => {
        setBasketData(data); 
      })
      .catch((error) => console.error("❌ Error fetching baskets:", error));
  }, []);

  useEffect(() => {
    if (username.toLowerCase() === "administrator") {
      navigate("/administrator");
    }
  }, [username, navigate]);

  // ✅ Centralized handleLogin function
  const handleLogin = (inputUsername) => {
    if (inputUsername.trim() === "") return;
    const formattedUsername = inputUsername.trim().toLowerCase(); // ✅ Always lowercase
    setUsername(formattedUsername);
    localStorage.setItem("username", formattedUsername); // ✅ Save in lowercase
  };

  // ✅ Centralized handleLogout function
  const handleLogout = () => {
    setUsername("");
    localStorage.removeItem("username");
  };

  return (
    <BasketContext.Provider value={{ basketData, setBasketData, username, setUsername, handleLogin, handleLogout }}>
      <Nav username={username} />
      <main className="mx-3">
        <Outlet /> {/* ✅ This tells React Router where to render child pages */}
      </main>
    </BasketContext.Provider>
  );
}

export default App;
