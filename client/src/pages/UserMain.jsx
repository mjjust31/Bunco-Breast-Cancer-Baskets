import React, { useState, useContext, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BasketContext } from "../context/BasketContext";
import "./UserMain.scss";

const UserMain = () => {
  const {
    username,
    handleLogin,
    handleLogout,
    basketData,
    favorites,
    setFavorites,
  } = useContext(BasketContext);
  const [tempUsername, setTempUsername] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const isAdmin = username?.toLowerCase() === "admin"; // ✅ Check if admin

  useEffect(() => {
    if (username && !isAdmin) {
      // ✅ Admin doesn't fetch favorites
      fetch(`/api/favorites/${username}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setFavorites(data);
          } else {
            console.error("❌ Unexpected response format:", data);
          }
        })
        .catch((error) => console.error("❌ Error fetching favorites:", error));
    }
  }, [username]);

  const isFavorited = (basketId) =>
    favorites.some((fav) => fav._id === basketId);

  const toggleFavorite = async (basketId) => {
    if (isAdmin) return; // ✅ Admin can't toggle favorites

    try {
      if (isFavorited(basketId)) {
        await fetch(`/api/favorites/${username}/${basketId}`, {
          method: "DELETE",
        });
        setFavorites((prev) => prev.filter((fav) => fav._id !== basketId));
      } else {
        const res = await fetch(`/api/favorites/${username}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ basketId }),
        });

        const data = await res.json();
        if (data.success) {
          const fullBasket = basketData.find(
            (basket) => basket._id === basketId
          );
          if (fullBasket) {
            setFavorites((prev) => [...prev, fullBasket]);
          }
        }
      }
    } catch (error) {
      console.error("❌ Error updating favorites:", error);
    }
  };

  return (
    <div className="main-container">
      {!username ? (
        <div className="login-container">
          <p>Enter your name to save baskets</p>
          <input
            type="text"
            placeholder="Enter your username"
            value={tempUsername}
            onChange={(e) => setTempUsername(e.target.value)}
            className="input"
          />
          <button
            onClick={() => handleLogin(tempUsername, navigate)}
            className="login-button">
            Submit
          </button>
        </div>
      ) : (
        <div className="welcome-container">
          <button
            onClick={() => handleLogout(navigate)}
            className="logout-button">
            Log Out
          </button>

          <p>
            Welcome, <strong>{username}</strong>!
          </p>
        </div>
      )}

      {basketData.length > 0 && (
        <div className="carousel-container">
          <div className="basket-display">
            <h3>
              #{currentIndex + 1} {basketData[currentIndex].name}
            </h3>
            <p>{basketData[currentIndex].content}</p>

            {/* ✅ Show Favorite Button only if NOT Admin */}
            {username && !isAdmin && (
              <button
                className={`favorite-button ${
                  isFavorited(basketData[currentIndex]._id)
                    ? "favorited"
                    : "not-favorited"
                }`}
                onClick={() => toggleFavorite(basketData[currentIndex]._id)}>
                <FaHeart className="heart-icon" />
                {isFavorited(basketData[currentIndex]._id)
                  ? " Remove from Favorites"
                  : " Add to Favorites"}
              </button>
            )}
          </div>

          <div className="carousel-arrows">
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev > 0 ? prev - 1 : basketData.length - 1
                )
              }
              className="carousel-button left">
              <FaArrowLeft />
            </button>

            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev < basketData.length - 1 ? prev + 1 : 0
                )
              }
              className="carousel-button right">
              <FaArrowRight />
            </button>
          </div>

          <p>
            {username &&
              "After adding favorites, click the Favorites link above to view them!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserMain;
