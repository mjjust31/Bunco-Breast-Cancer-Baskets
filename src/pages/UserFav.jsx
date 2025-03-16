import React from "react";
import { useOutletContext } from "react-router-dom";

function UserFav() {
  const { favorites, basketData } = useOutletContext();

  // ✅ Find full basket info based on stored favorite IDs
  const favoriteBaskets = basketData.filter((basket) => favorites.includes(basket.id));

  return (
    <div>
      <h1>Favorites</h1>
      {favoriteBaskets.length === 0 ? (
        <p>No favorites selected yet.</p>
      ) : (
        <ul>
          {favoriteBaskets.map((basket) => (
            <li key={basket.id}>
              <h2>{`Basket #${basket.id}: ${basket.name}`}</h2>
              <ul>
                {basket.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserFav;
