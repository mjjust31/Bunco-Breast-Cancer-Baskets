import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasketForm from "../components/BasketForm";
import "./AdminMain.scss";

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

  //adds a basket
  const handleAddBasket = (newBasket) => {
    setBasketData((prevBaskets) => {
      // Add the new basket to the array
      const updatedBaskets = [...prevBaskets, newBasket];
  
      // Reassign IDs to ensure they stay sequential (1, 2, 3, ...)
      return updatedBaskets.map((basket, index) => ({
        ...basket,
        id: index + 1, // Always assigns IDs in order
      }));
    });
  };
  

  //deletes all baskets

  const deleteAllBaskets = (basket) => {
    setBasketData([]);
    setShowForm(false);
  };

  //deletets a basket
  const deleteSingleBasket = (basket) => {
    setBasketData((prevBaskets) => {
      // Remove the selected basket
      const updatedBaskets = prevBaskets.filter((b) => b.id !== basket.id);
  
      // Renumber the remaining baskets to keep IDs sequential
      return updatedBaskets.map((b, index) => ({
        ...b,
        id: index + 1, // Always assigns IDs in order
      }));
    });
  };
  
  //edits a particular basket by id
  const editSingleBasket = (updatedBasket) => {
    setBasketData((prevBaskets) =>
      prevBaskets.map((b) =>
        b.id === updatedBasket.id ? { ...b, ...updatedBasket } : b
      )
    );
  };
  

  return (
    <div>
      <h1>Admin Panel: Manage Baskets</h1>
      {/* ✅ Logout Button */}
      <button onClick={handleLogout}>🚪 Logout</button>

      <p>
        Total Baskets: <strong>{basketData.length}</strong>
      </p>


      {/* ✅ Admin Controls */}
      <button onClick={() => setShowForm(true)}>➕ Add a Basket</button>
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
      <button onClick={() => deleteAllBaskets()}>Delete All Baskets</button>

      {basketData.length === 0 ? (
        <p>No baskets yet. Click "Add a Basket" to create one.</p>
      ) : (
        <ul>
          {basketData.map((basket) => (
            <li className="basket-card" key={basket.id}>
              <button onClick={()=>editSingleBasket(basket)}>Edit Basket</button>
              <button onClick={()=>deleteSingleBasket(basket)}>Delete Basket</button>
              <h3>
                #{basket.id} {basket.name}
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
