import React, { useContext, useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaHeart } from "react-icons/fa";
import { BasketContext } from "../context/BasketContext";
import "./UserFav.scss";

const UserFav = () => {
  const { favorites, setFavorites, username } = useContext(BasketContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAdmin = username?.toLowerCase() === "admin"; // ✅ Check if admin

  useEffect(() => {
    if (currentIndex >= favorites.length) {
      setCurrentIndex(0);
    }
  }, [favorites]);

  const removeFavorite = async (basketId) => {
    if (isAdmin) return; // ✅ Admin can't remove favorites

    try {
      `${process.env.REACT_APP_BACKEND_URL}/api/favorites/${username}/${basketId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to remove favorite");

      setFavorites((prevFavorites) =>
        prevFavorites.filter((basket) => basket._id !== basketId)
      );
    } catch (error) {
      console.error("❌ Error removing favorite:", error);
    }
  };

  if (isAdmin) {
    return (
      <div className="favorites-container">
        <h1>Admins cannot have favorites.</h1>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h1>Your Favorite Baskets</h1>

      {favorites.length === 0 ? (
        <p>You have no favorite baskets.</p>
      ) : (
        <div className="favorite-header">
          <strong>
            {favorites
              .sort((a, b) => a.basketNumber - b.basketNumber)
              .map((basket) => `#${basket.basketNumber || "N/A"}`)
              .join(", ")}
          </strong>
        </div>
      )}

      {favorites.length > 0 && (
        <div className="carousel-container">
          <div className="basket-display">
            <h3>
              Basket #{favorites[currentIndex].basketNumber || "N/A"}:{" "}
              {favorites[currentIndex].name}
            </h3>
            <p>{favorites[currentIndex].content}</p>
            <button
              className="remove-fav-button"
              onClick={() => removeFavorite(favorites[currentIndex]._id)}>
              <FaHeart className="heart-icon" />
              Remove from Favorites
            </button>
          </div>

          <div className="carousel-arrows">
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev > 0 ? prev - 1 : favorites.length - 1
                )
              }
              className="carousel-button left">
              <FaArrowLeft />
            </button>

            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev < favorites.length - 1 ? prev + 1 : 0
                )
              }
              className="carousel-button right">
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFav;
