import React, { useState, useContext, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BasketContext } from "../context/BasketContext";
import "./UserMain.scss";
import Button from "../components/Buttons/Buttons";

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
  const isAdmin = username?.toLowerCase() === "admin";

  useEffect(() => {
    console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);
  }, []);

  useEffect(() => {
    if (username && !isAdmin) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/favorites/${username}`)
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
    if (isAdmin) return;

    try {
      if (isFavorited(basketId)) {
        await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/favorites/${username}/${basketId}`,
          {
            method: "DELETE",
          }
        );
        setFavorites((prev) => prev.filter((fav) => fav._id !== basketId));
      } else {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/favorites/${username}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ basketId }),
          }
        );

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
          <Button
            onClick={() => handleLogin(tempUsername, navigate)}
            className="login-button"
            text="Login">
            Login
          </Button>
        </div>
      ) : (
        <div className="welcome-container">
          <Button
            onClick={() => handleLogout(navigate)}
            className="logout-button"
            text="Log Out">
            Logout
          </Button>
          <p>
            Welcome, <strong>{username}</strong>!
          </p>
        </div>
      )}

      {basketData.length > 0 ? (
        <div className="carousel-container">
          <div className="basket-display">
            <h3>
              #{currentIndex + 1} {basketData[currentIndex].name}
            </h3>
            <p>{basketData[currentIndex].content}</p>

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

          {isAdmin ? (
            <p>These baskets are now available at the home screen</p>
          ) : (
            username && (
              <p className="view-favorites-note">
                After adding favorites, click the Favorites link above to view
                them!
              </p>
            )
          )}
        </div>
      ) : (
        <div className="no-baskets">
          <p>No Baskets yet! Keep checking!</p>
        </div>
      )}
    </div>
  );
};

export default UserMain;
