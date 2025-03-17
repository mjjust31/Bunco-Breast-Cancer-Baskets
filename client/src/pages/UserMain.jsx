import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./UserMain.scss";

const UserMain = ({ username, setUsername, basketData }) => {
  const [tempUsername, setTempUsername] = useState(username || "");
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate(); // Set up useNavigate for redirection

  // Fetch the favorites from the server when the component loads
  useEffect(() => {
    if (username) {
      fetch("/api/baskets")  // Calls all baskets without login
        .then(response => response.json())
        .then(data => setFavorites(data))
        .catch(error => console.error("Error fetching favorites:", error));
    }
  }, [username]);

  // Handle Add to Favorites
  const handleAddToFavorites = (id) => {
    if (!favorites.includes(id)) {
      fetch(`/api/${username}/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ basketId: id }),
      })
        .then(response => response.json())
        .then(updatedFavorites => {
          setFavorites(updatedFavorites);
        })
        .catch(error => console.error("Error adding to favorites:", error));
    }
  };

  // Handle Remove from Favorites
  const handleRemoveFromFavorites = (id) => {
    fetch(`/api/${username}/favorites`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ basketId: id }),
    })
      .then(response => response.json())
      .then(updatedFavorites => {
        setFavorites(updatedFavorites);
      })
      .catch(error => console.error("Error removing from favorites:", error));
  };

  // Handle Login
  const handleLogin = () => {
    if (tempUsername.trim() === "") return;
    setUsername(tempUsername.trim());
  };

  // Handle Logout
  const handleLogout = () => {
    setUsername(""); // Clear username state
    setFavorites([]); // Clear favorites state
  };

  return (
    <div className="main-container">
      <header>
        <h1>Bunco Baskets</h1>
      </header>

      {/* If username is not provided, show the login form */}
      {!username ? (
        <div className="login-container">
          <input
            type="text"
            placeholder="Enter your username"
            value={tempUsername}
            onChange={(e) => setTempUsername(e.target.value)}
            className="input"
          />
          <button onClick={handleLogin} className="login-button">Submit</button>
        </div>
      ) : (
        <div>
          <p>Welcome, <strong>{username}</strong>!</p>
          <button onClick={handleLogout} className="logout-button">Log Out</button>
        </div>
      )}

      {/* Display Baskets */}
      <div>
        {/* Check if basketData is an array and has data before using map */}
        {Array.isArray(basketData) && basketData.length === 0 ? (
          <p>No baskets available</p>
        ) : (
          basketData && Array.isArray(basketData) && basketData.map((basket) => (
            <div key={basket.id} className="basket-container">
              <h2>{`#${basket.id}: ${basket.name}`}</h2>
              <p>{basket.content}</p>

              {/* Show Add to Favorites if user is logged in */}
              {username && !favorites.includes(basket.id) && (
                <button 
                  onClick={() => handleAddToFavorites(basket.id)} 
                  className="add-favorite-button"
                >
                  Add to Favorites
                </button>
              )}

              {/* Show Remove from Favorites if the basket is already a favorite */}
              {username && favorites.includes(basket.id) && (
                <button 
                  onClick={() => handleRemoveFromFavorites(basket.id)} 
                  className="remove-favorite-button"
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
