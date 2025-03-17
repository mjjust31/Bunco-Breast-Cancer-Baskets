import React, { useState, useEffect } from "react";

function UserFav() {
  const [localFavorites, setLocalFavorites] = useState([]);
  const [basketData, setBasketData] = useState([]);

  useEffect(() => {


    // Fetch basket data from backend
    fetch(`/api/${username}/favorites`)
      .then((response) => response.json())
      .then((data) => setBasketData(data))
      .catch((error) => console.error("Error fetching baskets:", error));
  }, []);

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
