import React, { useContext, useState } from "react";
import { BasketContext } from "../context/BasketContext";
import BasketForm from "./BasketForm"; // ✅ Import modal component

const AdminMain = () => {
    const { username, handleLogin, handleLogout } = useContext(BasketContext);
    const [tempUsername, setTempUsername] = useState("");
    const [showModal, setShowModal] = useState(false); // ✅ Controls modal visibility

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
                    <button onClick={() => handleLogin(tempUsername)} className="login-button">
                        Submit
                    </button>
                </div>
            ) : (
                <div>
                    <p>Welcome, <strong>{username}</strong>!</p>
                    <button onClick={handleLogout} className="logout-button">
                        Log Out
                    </button>

                    {/* ✅ Button to open the modal */}
                    <div className="admin-actions">
                        <button className="create-basket-button" onClick={() => setShowModal(true)}>
                            Create Basket
                        </button>
                    </div>

                    {/* ✅ Render BasketForm modal conditionally */}
                    {showModal && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <button className="close-modal" onClick={() => setShowModal(false)}>X</button>
                                <BasketForm closeModal={() => setShowModal(false)} /> {/* ✅ Pass function to close modal */}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminMain;
