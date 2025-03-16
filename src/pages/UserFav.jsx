import React, { useState, useEffect } from "react";

function UserFav({ favorites, basketData }) {
  const [localFavorites, setLocalFavorites] = useState(favorites);
  const [hasRefreshed, setHasRefreshed] = useState(false); // Track if we've already refreshed

  // Sync state with localStorage every time favorites change
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setLocalFavorites(storedFavorites);

    if (!hasRefreshed) {
      // Trigger refresh once
      setHasRefreshed(true);
    }
  }, [favorites, hasRefreshed]); // Re-run whenever favorites change

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
              {/* Render basket content as a single string */}
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
