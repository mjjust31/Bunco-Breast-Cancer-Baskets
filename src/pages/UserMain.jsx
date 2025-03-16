import React from "react";
import { useOutletContext } from "react-router-dom";
import "./UserMain.css";

const UserMain = () => {
  const { favorites, setFavorites, basketData } = useOutletContext();

  const handleFav = (id) => {
    if (!id) return;

    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id) // Remove if already a favorite
        : [...prevFavorites, id]; // Add if not a favorite

      console.log("Updated Favorites:", newFavorites); // ✅ Debugging log
      return newFavorites;
    });
  };

  return (
    <div>
      <section className="container">
        <h1 className="basket-title">Bunco Baskets</h1>
        {basketData.map((basket) => (
          <div key={basket.id} className="basket-container">
            <button onClick={() => handleFav(basket.id)}>
              {favorites.includes(basket.id) ? "Remove from Favorites" : "Add to Favorites"}
            </button>
            <h2>{`#${basket.id}: ${basket.name}`}</h2>
            <ul>
              {basket.content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default UserMain;
