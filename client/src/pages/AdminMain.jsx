import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { BasketContext } from "../context/BasketContext";
import { Link } from "react-router-dom";

const AdminMain = () => {
    const { username, handleLogin, handleLogout } = useContext(BasketContext);
    const [tempUsername, setTempUsername] = useState("");
    const navigate = useNavigate(); // ✅ Get navigate

    return (
        <div className="admin-container">
            {!username ? (
                <div className="login-container">
                    <input
                        type="text"
                        placeholder="Enter your admin username"
                        value={tempUsername}
                        onChange={(e) => setTempUsername(e.target.value)}
                        className="input"
                    />
                    <button onClick={() => handleLogin(tempUsername, navigate)} className="login-button"> {/* ✅ Pass navigate */}
                        Submit
                    </button>
                </div>
            ) : (
                <div>
                    <p>Welcome, <strong>{username}</strong>!</p>
                    <button onClick={() => handleLogout(navigate)} className="logout-button"> {/* ✅ Pass navigate */}
                        Log Out
                    </button>

                    {/* ✅ Create Basket Button */}
                    <div className="admin-actions">
                        <Link to="/administrator/basketform">
                            <button className="create-basket-button">Create Basket</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminMain;
