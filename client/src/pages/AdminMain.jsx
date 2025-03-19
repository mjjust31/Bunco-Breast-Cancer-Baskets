import React, { useState, useContext } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { BasketContext } from "../context/BasketContext";
import BasketForm from "./BasketForm"; // ✅ Import the form
import "./AdminMain.scss";

const AdminMain = () => {
    const { basketData, setBasketData, username, handleLogout } = useContext(BasketContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBasket, setEditingBasket] = useState(null);
    const navigate = useNavigate(); // ✅ Define navigate

    // ✅ Open Form for New Basket
    const openCreateBasket = () => {
        setEditingBasket(null);
        setIsModalOpen(true);
    };

    // ✅ Open Form for Editing a Basket
    const openEditBasket = (basket) => {
        setEditingBasket(basket);
        setIsModalOpen(true);
    };

    // ✅ Remove Basket
    const deleteBasket = async (basketId) => {
        try {
            const response = await fetch(`/api/baskets/admin/${basketId}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete basket");

            // ✅ Remove from carousel list
            setBasketData(prevBaskets => prevBaskets.filter(basket => basket._id !== basketId));
        } catch (error) {
            console.error("❌ Error deleting basket:", error);
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                {/* ✅ Pass navigate to handleLogout */}
                <button onClick={() => handleLogout(navigate)} className="logout-button">
                    Log Out
                </button>
                <h1>🎗 Admin Control Panel 🎗</h1>
            </div>

            {/* ✅ Create Basket Button */}
            <button onClick={openCreateBasket} className="create-basket-button">Create New Basket</button>

            {/* ✅ Basket Carousel */}
            {basketData.length > 0 && (
                <div className="carousel-container">
                    <div className="basket-display">
                        <h3>#{currentIndex + 1} {basketData[currentIndex].name}</h3>
                        <p>{basketData[currentIndex].content}</p>

                        {/* ✅ Admin Controls */}
                        <div className="admin-buttons">
                            <button onClick={() => openEditBasket(basketData[currentIndex])} className="edit-button">
                                Edit
                            </button>
                            <button onClick={() => deleteBasket(basketData[currentIndex]._id)} className="delete-button">
                                Delete
                            </button>
                        </div>
                    </div>

                    <div className="carousel-arrows">
                        <button onClick={() => setCurrentIndex(prev => prev > 0 ? prev - 1 : basketData.length - 1)} className="carousel-button left">
                            <FaArrowLeft />
                        </button>
                        <button onClick={() => setCurrentIndex(prev => prev < basketData.length - 1 ? prev + 1 : 0)} className="carousel-button right">
                            <FaArrowRight />
                        </button>
                    </div>
                </div>
            )}

            {/* ✅ Basket Form Modal */}
            <BasketForm isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} editingBasket={editingBasket} />
        </div>
    );
};

export default AdminMain;
