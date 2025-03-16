import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
// import "./AdminMain.css"; // ✅ Add custom styles

const AdminMain = () => {
  const { basketData, setBasketData } = useOutletContext();
  const [showModal, setShowModal] = useState(false); // ✅ Controls Add Basket Modal
  const [newBasket, setNewBasket] = useState({ name: "", content: "" }); // ✅ Only ONE content entry

  // ✅ Handle Basket Deletion
  const handleDeleteBasket = (id) => {
    setBasketData((prevBaskets) => prevBaskets.filter((basket) => basket.id !== id));
  };

  // ✅ Delete All Baskets
  const handleDeleteAll = () => {
    setBasketData([]);
  };

  // ✅ Handle Adding a New Basket
  const handleAddBasket = () => {
    if (newBasket.name.trim() === "" || newBasket.content.trim() === "") {
      alert("Please enter a basket name and one content item.");
      return;
    }

    setBasketData((prevBaskets) => [
      ...prevBaskets,
      { id: prevBaskets.length + 1, name: newBasket.name, content: newBasket.content }
    ]);

    // ✅ Reset Form & Close Modal
    setNewBasket({ name: "", content: "" });
    setShowModal(false);
  };

  return (
    <div>
      <h1>Admin Panel: Manage Baskets</h1>
      <p>Total Baskets: <strong>{basketData.length}</strong></p>

      {/* ✅ Add Basket Button - Opens Modal */}
      <button onClick={() => setShowModal(true)}>Add New Basket</button>
      <button onClick={handleDeleteAll}>Delete All Baskets</button>

      {/* ✅ List of Existing Baskets */}
      <ul>
        {basketData.map((basket) => (
          <li key={basket.id}>
            <h3>{basket.name}</h3>
            <p>Content: {basket.content}</p>
            <button onClick={() => handleDeleteBasket(basket.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* ✅ Add Basket Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add a New Basket</h2>
            <input
              type="text"
              placeholder="Basket Name"
              value={newBasket.name}
              onChange={(e) => setNewBasket({ ...newBasket, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Content"
              value={newBasket.content}
              onChange={(e) => setNewBasket({ ...newBasket, content: e.target.value })}
            />
            <button onClick={handleAddBasket}>Save Basket</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMain;
