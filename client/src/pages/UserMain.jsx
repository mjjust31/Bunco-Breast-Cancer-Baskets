import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";  // ✅ Import `useNavigate`
import { BasketContext } from "../context/BasketContext";  
import "./UserMain.scss";

const UserMain = () => {
    const { username, handleLogin, handleLogout } = useContext(BasketContext);
    const [tempUsername, setTempUsername] = useState(username || "");
    const navigate = useNavigate(); // ✅ Get navigate

    return (
        <div className="main-container">
            <header>
                <h1>Bunco Baskets</h1>
            </header>

            {!username ? (
                <div className="login-container">
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={tempUsername}
                        onChange={(e) => setTempUsername(e.target.value)}
                        className="input"
                    />
                    <button onClick={() => handleLogin(tempUsername, navigate)} className="login-button"> {/* ✅ Pass `navigate` */}
                        Submit
                    </button>
                </div>
            ) : (
                <div>
                    <p>Welcome, <strong>{username}</strong>!</p>
                    <button onClick={() => handleLogout(navigate)} className="logout-button"> {/* ✅ Pass `navigate` */}
                        Log Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMain;
