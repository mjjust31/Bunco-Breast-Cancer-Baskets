import React, { useState, useContext, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaHeart } from "react-icons/fa";
import { BasketContext } from "../context/BasketContext";
import "./UserFav.scss";

const UserFav = () => {
    const { favorites, setFavorites, username } = useContext(BasketContext);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex >= favorites.length) {
            setCurrentIndex(0); // ✅ Reset index if last item is removed
        }
    }, [favorites]);

    // ✅ Remove from favorites
    const removeFavorite = async (basketId) => {
        try {
            const response = await fetch(`/api/favorites/${username}/${basketId}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to remove favorite");

            setFavorites(prevFavorites => prevFavorites.filter(basket => basket._id !== basketId));
        } catch (error) {
            console.error("❌ Error removing favorite:", error);
        }
    };

    return (
        <div className="favorites-container">
            <h1>Your Favorite Baskets</h1>

            {/* ✅ Show favorite basket numbers in sorted order */}
            {favorites.length === 0 ? (
                <p>You have no favorite baskets.</p>
            ) : (
                <div className="favorite-header">
                    <strong>
                        {favorites
                            .sort((a, b) => (a.basketNumber || 0) - (b.basketNumber || 0)) // ✅ Always sorted
                            .map((basket) => `#${basket.basketNumber}`)
                            .join(", ")}
                    </strong>
                </div>
            )}

            {/* ✅ Favorite Basket Carousel */}
            {favorites.length > 0 && (
                <div className="carousel-container">
                    {/* ✅ Basket Display */}
                    <div className="basket-display">
                        <h3>
                            Basket #{favorites[currentIndex].basketNumber}: {favorites[currentIndex].name}
                        </h3>
                        <p>{favorites[currentIndex].content}</p>

                        {/* ✅ Remove Favorite Button with Heart Icon */}
                        <button
                            className="remove-fav-button"
                            onClick={() => removeFavorite(favorites[currentIndex]._id)}
                        >
                            <FaHeart className="heart-icon" /> Remove from Favorites
                        </button>
                    </div>

                    {/* ✅ Carousel Arrows (Below the Card) */}
                    <div className="carousel-arrows">
                        <button
                            onClick={() => setCurrentIndex(prev => (prev > 0 ? prev - 1 : favorites.length - 1))}
                            className="carousel-button left">
                            <FaArrowLeft className="arrow-icon" />
                        </button>
                        <button
                            onClick={() => setCurrentIndex(prev => (prev < favorites.length - 1 ? prev + 1 : 0))}
                            className="carousel-button right">
                            <FaArrowRight className="arrow-icon" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserFav;
