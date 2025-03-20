import React, { useState, useContext, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BasketContext } from "../context/BasketContext";
import BasketForm from "./BasketForm";
import "./AdminMain.scss";

const AdminMain = () => {
    const { basketData, setBasketData, username, handleLogout, showConfirmationModal, closeConfirmationModal } = useContext(BasketContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBasket, setEditingBasket] = useState(null);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (basketData.length === 0) {
            setCurrentIndex(0);
        }
    }, [basketData]);

    // Open Form for New Basket with Empty Strings
    const openCreateBasket = () => {
        closeConfirmationModal(); // Ensure the confirmation modal is closed
        setEditingBasket({ name: "", content: "" }); // Always reset to empty strings
        setIsModalOpen(true);
    };

    // Open Form for Editing a Basket
    const openEditBasket = (basket) => {
        setEditingBasket(basket);
        setIsModalOpen(true);
    };

    // Remove Basket
    const deleteBasket = async (basketId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/baskets/admin/${basketId}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete basket");

            // Delay state update to prevent React setState errors
            setTimeout(() => {
                setBasketData(prevBaskets => {
                    const updatedBaskets = prevBaskets.filter(basket => basket._id !== basketId);

                    // Adjust current index to avoid out-of-bounds error
                    setCurrentIndex(prevIndex => (prevIndex >= updatedBaskets.length ? Math.max(0, updatedBaskets.length - 1) : prevIndex));

                    return updatedBaskets;
                });
            }, 0);
        } catch (error) {
            console.error("❌ Error deleting basket:", error);
        }
    };

    // Delete All Baskets Confirmation
    const confirmDeleteAllBaskets = () => {
        setIsDeleteConfirmOpen(true);
    };

    // Delete All Baskets
    const deleteAllBaskets = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/baskets/admin`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete all baskets");

            setTimeout(() => {
                setBasketData([]); // Clear all baskets
                setCurrentIndex(0); // Reset index
                setIsDeleteConfirmOpen(false);
            }, 0);
        } catch (error) {
            console.error("❌ Error deleting all baskets:", error);
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <button onClick={() => handleLogout(navigate)} className="logout-button">Log Out</button>
                <h1>🎗 Admin Control Panel 🎗</h1>
            </div>

            {/* Create Basket Button */}
            <button onClick={openCreateBasket} className="create-basket-button">Create New Basket</button>

            {/* Basket Carousel */}
            {basketData.length > 0 ? (
                <div className="carousel-container">
                    <div className="basket-display">
                        <h3>#{currentIndex + 1} {basketData[currentIndex]?.name || "No Name"}</h3>
                        <p>{basketData[currentIndex]?.content || "No Content"}</p>

                        {/* Admin Controls */}
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

                    {/* Delete All Baskets Button */}
                    <button onClick={confirmDeleteAllBaskets} className="delete-all-button">Delete All Baskets</button>
                </div>
            ) : (
                <p>No baskets available. Please create a new basket.</p>
            )}

            {/* Basket Form Modal */}
            <BasketForm 
                isModalOpen={isModalOpen} 
                closeModal={() => setIsModalOpen(false)} 
                editingBasket={editingBasket} 
            />

            {/* Confirmation Modal After Adding a Basket */}
            {showConfirmationModal && (
                <div className="modal-overlay show">
                    <div className="modal show">
                        <h2>Success!</h2>
                        <p>You successfully added a basket! Would you like to add another basket?</p>
                        <div className="modal-buttons">
                            <button onClick={openCreateBasket} className="modal-button">Yes</button>
                            <button onClick={closeConfirmationModal} className="modal-button">No</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Modal for Deleting All Baskets */}
            {isDeleteConfirmOpen && (
                <div className="modal-overlay show">
                    <div className="modal show">
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to delete all baskets? This action cannot be undone.</p>
                        <div className="modal-buttons">
                            <button onClick={deleteAllBaskets} className="modal-button delete">Yes, Delete All</button>
                            <button onClick={() => setIsDeleteConfirmOpen(false)} className="modal-button cancel">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminMain;

