import React, { useState } from "react";
import "./UserMain.css";

const UserMain = ({ username, setUsername, basketData }) => {
  const [tempUsername, setTempUsername] = useState(username || "");

  const handleLogin = () => {
    if (tempUsername.trim() === "") return;
    setUsername(tempUsername.trim());
    localStorage.setItem("username", tempUsername.trim());
  };

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
        <p>Welcome, <strong>{username}</strong>!</p>
      )}

      {/* ✅ Prevents crash when there are no baskets */}
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
