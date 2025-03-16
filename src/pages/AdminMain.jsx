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
    setBasketData((prevBaskets) => [
      ...prevBaskets,
      { id: prevBaskets.length + 1, ...newBasket },
    ]);
    setShowForm(false);
  };

  //deletes all baskets

  const deleteAllBaskets = (basket) => {
    setBasketData([]);
    setShowForm(false);
  };

  //deletets a basket
  const deleteSingleBasket = (basket) => {
    setBasketData((prevBaskets) => prevBaskets.filter((b) => b.id !== basket.id));
  };
  
  //edits a particular basket by id

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
              <button>Edit Basket</button>
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
