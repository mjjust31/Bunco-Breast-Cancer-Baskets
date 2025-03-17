import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import BasketForm from "../components/BasketForm";
import "./AdminMain.scss";

const AdminMain = ({ username, setUsername }) => {
  const [basketData, setBasketData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🚀 Fetching baskets from /api/baskets..."); // ✅ Log when fetch starts
  
    fetch("/api/baskets") // Make sure it's the correct API route
      .then((response) => response.json())
      .then((data) => {
        console.log("📦 Baskets received in AdminMain:", data); // ✅ Log data
        setBasketData(data);
      })
      .catch((error) => console.error("❌ Error fetching baskets:", error));
  }, [])

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername("");
    navigate("/");
  };

  if (username.toLowerCase() !== "administrator") {
    return (
      <div className="access-denied">
        <h1>Access Denied</h1>
        <p>You must be an administrator to manage baskets.</p>
      </div>
    );
  }

  // ✅ Add a basket (backend)
  const handleAddBasket = (newBasket) => {
    console.log("Adding basket:", newBasket);
    fetch("/api/baskets/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBasket),
    })
      .then((response) => response.json())
      .then((updatedBaskets) => {
        console.log("Updated baskets:", updatedBaskets);
        setBasketData(updatedBaskets); // Update basketData state with the new array of baskets
      })
      .catch((error) => console.error("Error adding basket:", error));
  };

  // ✅ Delete all baskets (backend)
  const deleteAllBaskets = () => {
    fetch("/api/baskets/admin", { method: "DELETE" })
      .then(() => setBasketData([]))
      .catch((error) => console.error("Error deleting all baskets:", error));
  };

  // ✅ Delete a single basket (backend)
  const deleteSingleBasket = (basketId) => {
    fetch(`/api/baskets/admin/${basketId}`, { method: "DELETE" })
      .then(() => setBasketData((prevBaskets) => prevBaskets.filter((b) => b._id !== basketId))) // Use _id for MongoDB
      .catch((error) => console.error("Error deleting basket:", error));
  };

  // ✅ Edit a basket (backend)
  const editSingleBasket = (updatedBasket) => {
    fetch(`/api/baskets/admin/${updatedBasket._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBasket),
    })
      .then((response) => response.json())
      .then((updatedBaskets) => setBasketData(updatedBaskets))
      .catch((error) => console.error("Error editing basket:", error));
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel: Manage Baskets</h1>

      {/* ✅ Logout Button */}
      <button className="logout-button" onClick={handleLogout}>🚪 Logout</button>

      <p>
        Total Baskets: <strong>{basketData.length}</strong>
      </p>

      {/* ✅ Admin Controls */}
      <Link to="/" className="back-to-home-button">Back to Home</Link>
      <button className="add-basket-button" onClick={() => setShowForm(true)}>➕ Add a Basket</button>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <BasketForm
              onAddBasket={handleAddBasket}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <button className="delete-all-button" onClick={deleteAllBaskets}>Delete All Baskets</button>

      {basketData.length === 0 ? (
        <p>No baskets yet. Click "Add a Basket" to create one.</p>
      ) : (
        <ul className="basket-list">
          {basketData.map((basket) => (
            <li className="basket-card" key={basket._id}> {/* Use _id for MongoDB */}
              <button className="edit-button" onClick={() => editSingleBasket(basket)}>Edit Basket</button>
              <button className="delete-button" onClick={() => deleteSingleBasket(basket._id)}>Delete Basket</button>
              <h3>
                #{basket._id} {basket.name} {/* Use _id for MongoDB */}
              </h3>
              <p>{basket.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminMain;
