import React, { useState, useContext, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // ✅ Import arrows
import { useNavigate } from "react-router-dom";
import { BasketContext } from "../context/BasketContext";
import "./UserMain.scss";

const UserMain = () => {
    const { username, handleLogin, handleLogout, basketData, favorites, setFavorites } = useContext(BasketContext);
    const [tempUsername, setTempUsername] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (username) {
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

    // ✅ Check if a basket is favorited
    const isFavorited = (basketId) => favorites.some(fav => fav._id === basketId);

    // ✅ Add or Remove Favorite (Backend + Frontend Update)
    const toggleFavorite = async (basketId) => {
        try {
            if (isFavorited(basketId)) {
                await fetch(`/api/favorites/${username}/${basketId}`, { method: "DELETE" });
                setFavorites(prev => prev.filter(fav => fav._id !== basketId));
            } else {
                const res = await fetch(`/api/favorites/${username}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ basketId }),
                });

                const data = await res.json();
                if (data.success) {
                    const fullBasket = basketData.find(basket => basket._id === basketId);
                    if (fullBasket) {
                        setFavorites(prev => [...prev, fullBasket]); 
                    }
                }
            }
        } catch (error) {
            console.error("❌ Error updating favorites:", error);
        }
    };

    return (
        <div className="main-container">
            {/* ✅ User Welcome & Logout */}
            {!username ? (
                <div className="login-container">
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={tempUsername}
                        onChange={(e) => setTempUsername(e.target.value)}
                        className="input"
                    />
                    <button onClick={() => handleLogin(tempUsername, navigate)} className="login-button">
                        Submit
                    </button>
                </div>
            ) : (
                <div className="welcome-container">
                    <p>Welcome, <strong>{username}</strong>!</p>
                    <button onClick={handleLogout} className="logout-button">
                        Log Out
                    </button>
                </div>
            )}

            {/* ✅ Basket Carousel */}
            {basketData.length > 0 && (
                <div className="basket-carousel">
                    {/* ✅ Basket Display */}
                    <div className="basket-display">
                        <h3>#{currentIndex + 1} {basketData[currentIndex].name}</h3>
                        <p>{basketData[currentIndex].content}</p>

                        {/* ✅ Favorite Button */}
                        {username && (
                            <button
                                className={`favorite-button ${isFavorited(basketData[currentIndex]._id) ? "favorited" : "not-favorited"}`}
                                onClick={() => toggleFavorite(basketData[currentIndex]._id)}>
                                {isFavorited(basketData[currentIndex]._id) ? "Remove from Favorites" : "Add to Favorites"}
                            </button>
                        )}
                    </div>

                    {/* ✅ Arrows Below the Card */}
                    <div className="carousel-controls">
                        <button onClick={() => setCurrentIndex(prev => prev > 0 ? prev - 1 : basketData.length - 1)} className="carousel-button left">
                            <FaArrowLeft />
                        </button>
                        <button onClick={() => setCurrentIndex(prev => prev < basketData.length - 1 ? prev + 1 : 0)} className="carousel-button right">
                            <FaArrowRight />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMain;
