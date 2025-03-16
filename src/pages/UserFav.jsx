import React from "react";

function UserFav({ favorites, basketData }) {
  // Filter the baskets based on favorites
  const favoriteBaskets = basketData.filter((basket) => favorites.includes(basket.id));

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
