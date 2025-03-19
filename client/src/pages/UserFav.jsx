import React, { useContext, useState } from "react";
import { BasketContext } from "../context/BasketContext";
import "./UserFav.scss"; // ✅ Import styles

const UserFav = () => {
    const { favorites, setFavorites } = useContext(BasketContext);
    const [currentIndex, setCurrentIndex] = useState(0);

    // ✅ Remove from favorites
    const removeFavorite = (basketId) => {
        setFavorites(favorites.filter(fav => fav._id !== basketId));
    };

    return (
        <div className="favorites-container">
            <h1>You have selected {favorites.length} favorite basket{favorites.length !== 1 ? "s" : ""}!</h1>

            {/* ✅ Display Selected Favorite Numbers */}
            <div className="favorite-numbers">
                {favorites.map((fav, index) => (
                    <span key={index} className="fav-number">#{index + 1}</span>
                ))}
            </div>

            {/* ✅ Favorite Basket Carousel */}
            {favorites.length === 0 ? (
                <p>No favorite baskets selected.</p>
            ) : (
                <div className="basket-carousel">
                    <button
                        onClick={() => setCurrentIndex(prev => prev > 0 ? prev - 1 : favorites.length - 1)}
                        className="carousel-button left">
                        ◀
                    </button>

                    <div className="basket-display">
                        <h3>#{currentIndex + 1} {favorites[currentIndex].name}</h3>
                        <p>{favorites[currentIndex].content}</p>
                        <button className="remove-fav-button" onClick={() => removeFavorite(favorites[currentIndex]._id)}>
                            Remove from Favorites
                        </button>
                    </div>

                    <button
                        onClick={() => setCurrentIndex(prev => prev < favorites.length - 1 ? prev + 1 : 0)}
                        className="carousel-button right">
                        ▶
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserFav;
