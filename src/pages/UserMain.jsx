import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./UserMain.css";

const UserMain = ({ username, setUsername, basketData }) => {
  const [tempUsername, setTempUsername] = useState(username || "");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const navigate = useNavigate(); // Set up useNavigate for redirection

  // Handle Add to Favorites
  const handleAddToFavorites = (id) => {
    if (!favorites.includes(id)) {
      const updatedFavorites = [...favorites, id];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      // Redirect to the Home page after adding to favorites
      navigate("/");
    }
  };

  // Handle Remove from Favorites
  const handleRemoveFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((favId) => favId !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    // Redirect to the Home page after removing from favorites
    navigate("/");
  };

  // Handle Login
  const handleLogin = () => {
    if (tempUsername.trim() === "") return;
    setUsername(tempUsername.trim());
    localStorage.setItem("username", tempUsername.trim());
  };

  // Handle Logout
  const handleLogout = () => {
    setUsername(""); // Clear username state
    setFavorites([]); // Clear favorites state
    localStorage.removeItem("username"); // Remove username from localStorage
    localStorage.removeItem("favorites"); // Clear favorites from localStorage
  };

  return (
    <div>
      <h1>Bunco Baskets</h1>

      {/* If username is not provided, show the login form */}
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

      {/* Display Baskets */}
      <div>
        {basketData.length === 0 ? (
          <p>No baskets available</p>
        ) : (
          basketData.map((basket) => (
            <div key={basket.id} className="basket-container">
              <h2>{`#${basket.id}: ${basket.name}`}</h2>
              <p>Content: {basket.content}</p>

              {/* Show Add to Favorites if user is logged in */}
              {username && !favorites.includes(basket.id) && (
                <button onClick={() => handleAddToFavorites(basket.id)}>
                  Add to Favorites
                </button>
              )}

              {/* Show Remove from Favorites if the basket is already a favorite */}
              {username && favorites.includes(basket.id) && (
                <button onClick={() => handleRemoveFromFavorites(basket.id)}>
                  Remove from Favorites
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserMain;
