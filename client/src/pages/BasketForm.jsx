import React, { useState, useContext } from "react";
import { BasketContext } from "../App"; // ✅ Access context
import { useNavigate } from "react-router-dom";
// import "./BasketForm.scss"; // Add styling if needed

const BasketForm = () => {
  const { basketData, setBasketData } = useContext(BasketContext); // ✅ Get baskets
  const [basketName, setBasketName] = useState("");
  const [basketContent, setBasketContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!basketName.trim() || !basketContent.trim()) {
      alert("Basket name and content cannot be empty.");
      return;
    }

    const newBasket = {
      id: basketData.length + 1, // Temporary ID
      name: basketName.trim(),
      content: basketContent.trim(),
    };

    // ✅ Update Context State (Optimistic UI)
    setBasketData([...basketData, newBasket]);

    // ✅ Send to backend (if API exists)
    try {
      const response = await fetch("/api/baskets/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBasket),
      });

      if (!response.ok) throw new Error("Failed to add basket");

      console.log("✅ Basket added successfully");
    } catch (error) {
      console.error("❌ Error adding basket:", error);
    }

    // ✅ Reset form and navigate back
    setBasketName("");
    setBasketContent("");
    navigate("/administrator");
  };

  return (
    <div className="basket-form-container">
      <h2>Add a New Basket</h2>
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
        <button type="submit">Add Basket</button>
      </form>
    </div>
  );
};

export default BasketForm;
