import React, { useState, useEffect, useContext } from "react";
import { BasketContext } from "../context/BasketContext"; // ✅ Correct Import

function UserFav() {
  const { basketData, username } = useContext(BasketContext); // ✅ Get data from context
  const [localFavorites, setLocalFavorites] = useState([]);

  useEffect(() => {
    // Fetch user's favorite baskets from backend
    if (username) {
      fetch(`/api/${username}/favorites`)
        .then((response) => response.json())
        .then((data) => setLocalFavorites(data))
        .catch((error) => console.error("Error fetching favorites:", error));
    }
  }, [username]);

  // Filter the baskets based on favorites
  const favoriteBaskets = basketData.filter((basket) =>
    localFavorites.includes(basket.id)
  );

  return (
    <div className="favorites-container">
      <h1 className="favorites-heading">Your Favorites</h1>
      {favoriteBaskets.length === 0 ? (
        <p className="no-favorites-message">No favorites selected yet.</p>
      ) : (
        <div className="basket-cards-container">
          {favoriteBaskets.map((basket) => (
            <div key={basket.id} className="basket-card">
              <h2 className="basket-name">{`Basket #${basket.id}: ${basket.name}`}</h2>
              {basket.content ? (
                <p className="basket-content">{basket.content}</p>
              ) : (
                <p className="no-content-message">No content available</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserFav;
