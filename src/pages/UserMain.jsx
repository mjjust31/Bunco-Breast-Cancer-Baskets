import React, { useState, useEffect } from "react";
import "./UserMain.css";

const UserMain = ({ username, setUsername, basketData }) => {
  const [tempUsername, setTempUsername] = useState(username || "");

  // Handle Login
  const handleLogin = () => {
    if (tempUsername.trim() === "") return;
    setUsername(tempUsername.trim());
    localStorage.setItem("username", tempUsername.trim());
  };

  // Handle Logout
  const handleLogout = () => {
    setUsername(""); // Clear username state
    localStorage.removeItem("username"); // Remove username from localStorage
  };

  // Effect to initialize username from localStorage
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, [setUsername]);

  return (
    <div>
      <h1>Bunco Baskets</h1>

      {!username ? (
        <div className="login-container">
          <input
            type="text"
            placeholder="Enter your username"
            value={tempUsername}
            onChange={(e) => setTempUsername(e.target.value)}
          />
          <button onClick={handleLogin}>Submit</button>
        </div>
      ) : (
        <div>
          <p>Welcome, <strong>{username}</strong>!</p>
          {/* Log Out Button */}
          <button onClick={handleLogout}>Log Out</button>
        </div>
      )}

      {/* Prevents crash when there are no baskets */}
      {basketData.length === 0 ? (
        <p>No basket data at this time. Check back later!</p>
      ) : (
        basketData.map((basket) => (
          <div key={basket.id} className="basket-container">
            <h2>{`#${basket.id}: ${basket.name}`}</h2>
            <p>Content: {basket.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default UserMain;
