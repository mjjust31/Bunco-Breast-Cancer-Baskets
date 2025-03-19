import React, { useContext, useState, useEffect } from "react";
import { BasketContext } from "../context/BasketContext";
import "./UserFav.scss";

const UserFav = () => {
    const { favorites, setFavorites, username } = useContext(BasketContext);
    const [currentIndex, setCurrentIndex] = useState(0);

    console.log("🔥 Favorites Data:", favorites);

    useEffect(() => {
        if (currentIndex >= favorites.length) {
            setCurrentIndex(0); // ✅ Reset index if last item is removed
        }
    }, [favorites]);

    // ✅ Remove from favorites (Backend + State Update)
    const removeFavorite = async (basketId) => {
        try {
            const response = await fetch(`/api/favorites/${username}/${basketId}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to remove favorite");

            // ✅ Use functional state update to prevent stale state issues
            setFavorites(prevFavorites => prevFavorites.filter(basket => basket._id !== basketId));
        } catch (error) {
            console.error("❌ Error removing favorite:", error);
        }
    };

    return (
        <div className="favorites-container">
            <h1>Your Favorite Baskets</h1>

            {/* ✅ Show favorite basket numbers with fallback for missing values */}
            {favorites.length === 0 ? (
                <p>You have no favorite baskets.</p>
            ) : (
                <div className="favorite-header">
                    <strong>{favorites.map((basket) => `Basket #${basket.basketNumber || "N/A"}`).join(", ")}</strong>
                </div>
            )}

            {/* ✅ Favorite Basket Carousel */}
            {favorites.length > 0 && (
                <div className="basket-carousel">
                    <button
                        onClick={() => setCurrentIndex(prev => (prev > 0 ? prev - 1 : favorites.length - 1))}
                        className="carousel-button left">
                        ◀
                    </button>

                    <div className="basket-display">
                        <h3>Basket #{favorites[currentIndex].basketNumber || "N/A"}: {favorites[currentIndex].name}</h3>
                        <p>{favorites[currentIndex].content}</p>
                        <button
                            className="remove-fav-button"
                            onClick={() => removeFavorite(favorites[currentIndex]._id)}>
                            Remove from Favorites
                        </button>
                    </div>

                    <button
                        onClick={() => setCurrentIndex(prev => (prev < favorites.length - 1 ? prev + 1 : 0))}
                        className="carousel-button right">
                        ▶
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserFav;
