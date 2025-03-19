import React, { useState, useContext, useEffect } from "react";
import { BasketContext } from "../context/BasketContext";
import "./BasketForm.scss"; // ✅ Import styles

const BasketForm = ({ isModalOpen, closeModal, editingBasket }) => {
    const { setBasketData } = useContext(BasketContext);
    const [basketName, setBasketName] = useState("");
    const [basketContent, setBasketContent] = useState("");

    // ✅ Load Basket Data into Form when Editing
    useEffect(() => {
        if (editingBasket) {
            setBasketName(editingBasket.name);
            setBasketContent(editingBasket.content);
        } else {
            setBasketName("");
            setBasketContent("");
        }
    }, [editingBasket]);

    // ✅ Handle Form Submit (Create/Edit Basket)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!basketName.trim() || !basketContent.trim()) {
            alert("Basket name and content cannot be empty.");
            return;
        }

        const basketDataToSend = { name: basketName.trim(), content: basketContent.trim() };

        try {
            let response;
            if (editingBasket) {
                response = await fetch(`/api/baskets/admin/${editingBasket._id}`, {
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

            if (!response.ok) throw new Error(`Failed to ${editingBasket ? "edit" : "add"} basket`);

            const updatedBaskets = await response.json();
            setBasketData(updatedBaskets);
            closeModal();
        } catch (error) {
            console.error(`❌ Error ${editingBasket ? "editing" : "adding"} basket:`, error);
        }
    };

    return (
        <>
            {isModalOpen && (
                <div className="modal-overlay show">
                    <div className="modal show">
                        <h2>{editingBasket ? "Edit Basket" : "Create a New Basket"}</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Basket Name:
                                <input type="text" value={basketName} onChange={(e) => setBasketName(e.target.value)} />
                            </label>
                            <label>
                                Basket Content:
                                <textarea value={basketContent} onChange={(e) => setBasketContent(e.target.value)} />
                            </label>
                            <div className="modal-buttons">
                                <button type="submit">{editingBasket ? "Update Basket" : "Add Basket"}</button>
                                <button type="button" onClick={closeModal} className="cancel-button">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default BasketForm;
