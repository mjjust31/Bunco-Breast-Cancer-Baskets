import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./UserMain.scss";

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
    <div className="main-container"> {/* Apply the main-container class */}
      <header>
        <h1>Bunco Baskets</h1> {/* Header section */}
      </header>

      {/* If username is not provided, show the login form */}
      {!username ? (
        <div className="login-container"> {/* Apply login-container class */}
          <input
            type="text"
            placeholder="Enter your username"
            value={tempUsername}
            onChange={(e) => setTempUsername(e.target.value)}
            className="input" // Add input class for styling
          />
          <button onClick={handleLogin} className="login-button">Submit</button> {/* Add button class */}
        </div>
      ) : (
        <div>
          <p>Welcome, <strong>{username}</strong>!</p>
          {/* Log Out Button */}
          <button onClick={handleLogout} className="logout-button">Log Out</button> {/* Add button class */}
        </div>
      )}

      {/* Display Baskets */}
      <div>
        {basketData.length === 0 ? (
          <p>No baskets available</p>
        ) : (
          basketData.map((basket) => (
            <div key={basket.id} className="basket-container"> {/* Apply basket-container class */}
              <h2>{`#${basket.id}: ${basket.name}`}</h2>
              <p>{basket.content}</p>

              {/* Show Add to Favorites if user is logged in */}
              {username && !favorites.includes(basket.id) && (
                <button 
                  onClick={() => handleAddToFavorites(basket.id)} 
                  className="add-favorite-button" // Add button class for styling
                >
                  Add to Favorites
                </button>
              )}

              {/* Show Remove from Favorites if the basket is already a favorite */}
              {username && favorites.includes(basket.id) && (
                <button 
                  onClick={() => handleRemoveFromFavorites(basket.id)} 
                  className="remove-favorite-button" // Add button class for styling
                >
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
