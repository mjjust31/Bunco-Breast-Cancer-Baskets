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
    <div>
      <h1>Your Favorites</h1>
      {favoriteBaskets.length === 0 ? (
        <p>No favorites selected yet.</p>
      ) : (
        <ul>
          {favoriteBaskets.map((basket) => (
            <li key={basket.id}>
              <h2>{`Basket #${basket.id}: ${basket.name}`}</h2>
              {/* Render basket content as a single string */}
              {basket.content ? (
                <p>{basket.content}</p>
              ) : (
                <p>No content available</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserFav;
