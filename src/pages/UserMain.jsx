import React, { useState, useEffect } from "react";
import basketData from "../data/basketsData";
import "./UserMain.css";
import UserFav from "./UserFav";

const AdminDashboard = () => {
  const [favorites, setFavorites] = useState([]);

  const handleFav = (id) => {
    if (!id) return; // ✅ Prevent adding an invalid ID

    setFavorites((prevFavorites) => {
      const filteredFavorites = prevFavorites.filter((favId) => favId !== id);
      return [...filteredFavorites, id]; // ✅ Ensures no duplicates
    });
  };

  useEffect(() => {
    console.log("Updated Favorites:", favorites);
  }, [favorites]); // ✅ Logs the latest state

  return (
    <div>
      <section className="container">
        <h1 className="basket-title">Bunco Baskets</h1>
        <button onClick={UserFav}>View My Favorites</button>

        {basketData.map((basket) => (
          <div key={basket.id} className="basket-container">
            <button onClick={() => handleFav(basket.id)}>Add to Favorites</button>
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

export default AdminDashboard;
