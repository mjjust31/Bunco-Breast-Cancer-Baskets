import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BasketContext } from "../context/BasketContext"; 
import "./BasketForm.scss"; // ✅ Import styles

const BasketForm = () => {
    const { basketData, setBasketData } = useContext(BasketContext);
    const [basketName, setBasketName] = useState("");  
    const [basketContent, setBasketContent] = useState(""); 
    const [editingBasketId, setEditingBasketId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    // ✅ Open/Close Modal
    const openModal = () => {
        setBasketName(""); 
        setBasketContent("");
        setEditingBasketId(null);
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    // ✅ Add or Update Basket
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!basketName.trim() || !basketContent.trim()) {
            alert("Basket name and content cannot be empty.");
            return;
        }

        const basketDataToSend = { name: basketName.trim(), content: basketContent.trim() };
        try {
            let response;
            if (editingBasketId) {
                response = await fetch(`/api/baskets/admin/${editingBasketId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(basketDataToSend),
                });
            } else {
                response = await fetch("/api/baskets/admin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(basketDataToSend),
                });
            }

            if (!response.ok) throw new Error(`Failed to ${editingBasketId ? "edit" : "add"} basket`);

            const updatedBaskets = await response.json();
            setBasketData(updatedBaskets);
            closeModal(); 
            navigate("/administrator");
        } catch (error) {
            console.error(`❌ Error ${editingBasketId ? "editing" : "adding"} basket:`, error);
        }
    };

    // ✅ Edit Basket
    const startEditing = (basket) => {
        setEditingBasketId(basket._id);
        setBasketName(basket.name);
        setBasketContent(basket.content);
        setIsModalOpen(true);
    };

    // ✅ Delete One Basket
    const deleteBasket = async (basketId) => {
        if (!window.confirm("Are you sure you want to delete this basket?")) return;
        try {
            const response = await fetch(`/api/baskets/admin/${basketId}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete basket");

            const updatedBaskets = await response.json();
            setBasketData(updatedBaskets);
        } catch (error) {
            console.error("❌ Error deleting basket:", error);
        }
    };

    // ✅ Delete All Baskets
    const deleteAllBaskets = async () => {
        if (!window.confirm("Are you sure you want to delete ALL baskets?")) return;
        try {
            const response = await fetch(`/api/baskets/admin`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete all baskets");

            setBasketData([]);
        } catch (error) {
            console.error("❌ Error deleting all baskets:", error);
        }
    };

    return (
        <div className="admin-container">
            <button onClick={openModal} className="create-basket-button">
                + Create Basket
            </button>

            <h2>Manage Baskets</h2>
            <ul className="basket-list">
                {basketData.map((basket) => (
                    <li key={basket._id} className="basket-item">
                        <h3>{basket.name}</h3>
                        <p>{basket.content}</p>
                        <button onClick={() => startEditing(basket)} className="edit-button">Edit</button>
                        <button onClick={() => deleteBasket(basket._id)} className="delete-button">Delete</button>
                    </li>
                ))} 
            </ul>

            {basketData.length > 0 && (
                <button onClick={deleteAllBaskets} className="delete-all">
                    Delete All Baskets
                </button>
            )}

            {/* ✅ Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>{editingBasketId ? "Edit Basket" : "Create a New Basket"}</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Basket Name:
                                <input
                                    type="text"
                                    value={basketName}
                                    onChange={(e) => setBasketName(e.target.value)}
                                />
                            </label>
                            <label>
                                Basket Content:
                                <textarea
                                    value={basketContent}
                                    onChange={(e) => setBasketContent(e.target.value)}
                                />
                            </label>
                            <div className="modal-buttons">
                                <button type="submit">{editingBasketId ? "Update Basket" : "Add Basket"}</button>
                                <button type="button" onClick={closeModal} className="cancel-button">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BasketForm;
