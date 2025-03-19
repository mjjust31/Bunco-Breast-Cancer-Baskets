import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";  
import { BasketContext } from "../context/BasketContext";  
import NavTabs from "../components/NavTabs";  // ✅ Import Nav for logged-in users
import "./UserMain.scss";

const UserMain = () => {
    const { username, handleLogin, handleLogout, basketData, favorites, setFavorites } = useContext(BasketContext);
    const [tempUsername, setTempUsername] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    // ✅ Toggle Favorite Functionality
    const toggleFavorite = (basket) => {
        if (favorites.some(fav => fav._id === basket._id)) {
            setFavorites(favorites.filter(fav => fav._id !== basket._id)); // ✅ Remove from favorites
        } else {
            setFavorites([...favorites, basket]); // ✅ Add to favorites
        }
    };

    return (
        <div className="main-container">
            {/* ✅ NavBar Logic */}
            {username ? <NavTabs username={username} /> : <nav className="empty-navbar"></nav>}

            <header>
                <h1>Bunco Baskets</h1>
            </header>

            {/* ✅ Show Login When Not Logged In */}
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
                    <button onClick={() => handleLogout(navigate)} className="logout-button">
                        Log Out
                    </button>
                </div>
            )}

            {/* ✅ Basket Carousel (Visible for ALL users) */}
            {basketData.length === 0 ? (
                <p>No baskets available.</p>
            ) : (
                <div className="basket-carousel">
                    <button
                        onClick={() => setCurrentIndex(prev => prev > 0 ? prev - 1 : basketData.length - 1)}
                        className="carousel-button left">
                        ◀
                    </button>

                    <div className="basket-display">
                        <h3>#{currentIndex + 1} {basketData[currentIndex].name}</h3>
                        <p>{basketData[currentIndex].content}</p>

                        {/* ✅ Show "Add to Favorites" only when logged in */}
                        {username && (
                            <button
                                className={`favorite-button ${favorites.some(fav => fav._id === basketData[currentIndex]._id) ? "favorited" : ""}`}
                                onClick={() => toggleFavorite(basketData[currentIndex])}>
                                {favorites.some(fav => fav._id === basketData[currentIndex]._id) ? "Remove from Favorites" : "Add to Favorites"}
                            </button>
                        )}
                    </div>

                    <button
                        onClick={() => setCurrentIndex(prev => prev < basketData.length - 1 ? prev + 1 : 0)}
                        className="carousel-button right">
                        ▶
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMain;

