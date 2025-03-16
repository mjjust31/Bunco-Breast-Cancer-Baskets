import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasketForm from "../components/BasketForm";
import "./AdminMain.css"; 

const AdminMain = ({ username, setUsername, basketData, setBasketData }) => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("username"); // ✅ Remove user data
    setUsername(""); // ✅ Reset state
    navigate("/"); // ✅ Redirect to homepage
  };

  if (username.toLowerCase() !== "administrator") {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You must be an administrator to manage baskets.</p>
      </div>
    );
  }

  const handleAddBasket = (newBasket) => {
    setBasketData((prevBaskets) => [
      ...prevBaskets,
      { id: prevBaskets.length + 1, ...newBasket }
    ]);
    setShowForm(false);
  };

  return (
    <div>
      <h1>Admin Panel: Manage Baskets</h1>
      <p>Total Baskets: <strong>{basketData.length}</strong></p>

      {/* ✅ Logout Button */}
      <button onClick={handleLogout}>🚪 Logout</button>

      {/* ✅ Admin Controls */}
      <button onClick={() => setShowForm(true)}>➕ Add a Basket</button>

      {basketData.length === 0 ? (
        <p>No baskets yet. Click "Add a Basket" to create one.</p>
      ) : (
        <ul>
          {basketData.map((basket) => (
            <li key={basket.id}>
              <h3>{basket.name}</h3>
              <p>Content: {basket.content}</p>
            </li>
          ))}
        </ul>
      )}

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <BasketForm onAddBasket={handleAddBasket} onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMain;
