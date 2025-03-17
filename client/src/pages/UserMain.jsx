import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BasketContext } from "../App"; 
import "./UserMain.scss";

const UserMain = () => {
  const { basketData, username, handleLogin, handleLogout } = useContext(BasketContext); // ✅ Use from context
  const [tempUsername, setTempUsername] = useState(username || "");
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      fetch("/api/baskets")
        .then((response) => response.json())
        .then((data) => setFavorites(data))
        .catch((error) => console.error("Error fetching favorites:", error));
    }
  }, [username]);

  return (
    <div className="main-container">
      <header>
        <h1>Bunco Baskets</h1>
      </header>

      {!username ? (
        <div className="login-container">
          <input
            type="text"
            placeholder="Enter your username"
            value={tempUsername}
            onChange={(e) => setTempUsername(e.target.value)}
            className="input"
          />
          <button onClick={() => handleLogin(tempUsername)} className="login-button">
            Submit
          </button>
        </div>
      ) : (
        <div>
          <p>
            Welcome, <strong>{username}</strong>!
          </p>
          <button onClick={handleLogout} className="logout-button">
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMain;

