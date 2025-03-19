import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { BasketContext } from "../context/BasketContext";
import BasketForm from "./BasketForm"; // ✅ Import modal component
import "./AdminMain.scss"; // ✅ Ensure styles are applied

const AdminMain = () => {
    const { username, handleLogin, basketData, setBasketData } = useContext(BasketContext);
    const [tempUsername, setTempUsername] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBasket, setEditingBasket] = useState(null);
    const [currentBasketIndex, setCurrentBasketIndex] = useState(0);
    const navigate = useNavigate(); // ✅ Fix navigate issue

    console.log("AdminMain component is rendering. Username:", username);

    useEffect(() => {
        if (currentBasketIndex >= basketData.length) {
            setCurrentBasketIndex(0); // ✅ Prevent invalid index after deletion
        }
    }, [basketData]);

    // ✅ Open Create/Edit Modal
    const openModal = (basket = null) => {
        setEditingBasket(basket); // If editing, prefill basket details
        setIsModalOpen(true);
    };

    // ✅ Close Modal
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingBasket(null);
    };

    // ✅ Delete Single Basket & Update Numbers
    const deleteBasket = async (basketId) => {
        if (!window.confirm("Are you sure you want to delete this basket?")) return;
        try {
            const response = await fetch(`/api/baskets/admin/${basketId}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete basket");

            const updatedBaskets = await response.json();
            setBasketData(updatedBaskets);
            setCurrentBasketIndex(0); // ✅ Reset index after deletion
        } catch (error) {
            console.error("❌ Error deleting basket:", error);
        }
    };

    // ✅ Delete All Baskets
    const deleteAllBaskets = async () => {
        if (!window.confirm("Do you want to delete all the baskets?")) return;
        try {
            const response = await fetch(`/api/baskets/admin`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete all baskets");

            setBasketData([]);
            setCurrentBasketIndex(0); // ✅ Reset index after deletion
        } catch (error) {
            console.error("❌ Error deleting all baskets:", error);
        }
    };

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
                    <button onClick={() => handleLogin(tempUsername, navigate)} className="login-button">
                        Submit
                    </button>
                </div>
            ) : (
                <div>
                    <h1>Admin Control Center</h1>

                    {/* ✅ Basket Count Message */}
                    <p>You have {basketData.length} saved basket{basketData.length !== 1 ? "s" : ""}.</p>

                    {/* ✅ Button to open Create Basket Modal */}
                    <button className="create-basket-button" onClick={() => openModal()}>
                        + Create Basket
                    </button>

                    {/* ✅ Basket Carousel with Correct Basket Numbering */}
                    {basketData.length > 0 ? (
                        <div className="basket-carousel">
                            <button
                                onClick={() =>
                                    setCurrentBasketIndex((prev) => (prev > 0 ? prev - 1 : basketData.length - 1))
                                }
                                className="carousel-button left">
                                ◀
                            </button>

                            <div className="basket-display">
                                <h3>
                                    Basket #{basketData[currentBasketIndex]?.basketNumber || "N/A"}: {basketData[currentBasketIndex].name}
                                </h3>
                                <p>{basketData[currentBasketIndex].content}</p>
                                <button
                                    onClick={() => openModal(basketData[currentBasketIndex])}
                                    className="edit-button">
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteBasket(basketData[currentBasketIndex]._id)}
                                    className="delete-button">
                                    Delete
                                </button>
                            </div>

                            <button
                                onClick={() =>
                                    setCurrentBasketIndex((prev) => (prev < basketData.length - 1 ? prev + 1 : 0))
                                }
                                className="carousel-button right">
                                ▶
                            </button>
                        </div>
                    ) : (
                        <p>No baskets available. Add a new basket to get started!</p>
                    )}

                    {/* ✅ Delete All Baskets Button */}
                    {basketData.length > 0 && (
                        <button onClick={deleteAllBaskets} className="delete-all">
                            Delete All Baskets
                        </button>
                    )}

                    {/* ✅ Render BasketForm */}
                    <BasketForm
                        isModalOpen={isModalOpen}
                        closeModal={closeModal}
                        editingBasket={editingBasket}
                    />
                </div>
            )}
        </div>
    );
};

export default AdminMain;
