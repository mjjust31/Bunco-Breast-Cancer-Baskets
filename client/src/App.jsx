import React, { useState, useEffect, createContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import Nav from "./components/NavTabs";

export const BasketContext = createContext();

function App() {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [basketData, setBasketData] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch baskets when the app loads
  useEffect(() => {
    fetch("/api/baskets") // Uses Vite proxy
      .then((response) => response.json())
      .then((data) => {
        console.log("✅ Fetched baskets:", data);
        setBasketData(data);
      })
      .catch((error) => console.error("❌ Error fetching baskets:", error));
  }, []);

  // ✅ Handle Login
  const handleLogin = (tempUsername) => {
    if (!tempUsername.trim()) return;
    
    setUsername(tempUsername.trim());
    localStorage.setItem("username", tempUsername.trim());

    if (tempUsername.toLowerCase() === "administrator") {
      navigate("/administrator");
    }
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    setUsername("");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <BasketContext.Provider
      value={{ basketData, setBasketData, username, setUsername, handleLogin, handleLogout }}>
      <Nav username={username} />
      <main className="mx-3">
        <Outlet /> {/* ✅ This still renders UserMain, AdminMain, etc. */}
        <section className="global-baskets">
          <h2>Available Baskets</h2>
          {basketData.length === 0 ? (
            <p>No baskets available.</p>
          ) : (
            <ul className="basket-list">
              {basketData.map((basket) => (
                <li key={basket._id} className="basket-item">
                  <h3>{basket.name}</h3>
                  <p>{basket.content}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </BasketContext.Provider>
  );
}

export default App;
