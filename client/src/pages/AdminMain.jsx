import React, { useState, useContext, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BasketContext } from "../context/BasketContext";
import BasketForm from "./BasketForm";
import "./AdminMain.scss";

const AdminMain = () => {
  const {
    basketData,
    setBasketData,
    username,
    handleLogout,
    showConfirmationModal,
    closeConfirmationModal,
  } = useContext(BasketContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBasket, setEditingBasket] = useState(null);
  const [isDeleteBasketConfirmOpen, setIsDeleteBasketConfirmOpen] = useState(false);
  const [basketToDelete, setBasketToDelete] = useState(null);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");
  const [isDeleteAllConfirmOpen, setIsDeleteAllConfirmOpen] = useState(false);
  const [basketModified, setBasketModified] = useState(false); // Track if basket data is modified
  const navigate = useNavigate();

  // Re-fetch basket data after modification (deletion or creation)
  useEffect(() => {
    if (basketModified) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/baskets`)
        .then((response) => response.json())
        .then((data) => {
          setBasketData(data);
          setBasketModified(false); // Reset the modified state
        })
        .catch((error) => console.error("❌ Failed to fetch updated baskets:", error));
    }
  }, [basketModified, setBasketData]);

  useEffect(() => {
    if (basketData.length === 0) {
      setCurrentIndex(0);
    }
  }, [basketData]);

  const openCreateBasket = () => {
    closeConfirmationModal();
    setEditingBasket({ name: "", content: "" });
    setIsModalOpen(true);
  };

  const openEditBasket = (basket) => {
    setEditingBasket(basket);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (basketId) => {
    setBasketToDelete(basketId);
    setIsDeleteBasketConfirmOpen(true);
  };

  const confirmDeleteBasket = async () => {
    if (!basketToDelete) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/baskets/admin/${basketToDelete}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete basket");

      setBasketToDelete(null);
      setIsDeleteBasketConfirmOpen(false);
      setBasketModified(true); // Trigger re-fetch of baskets after deletion

      setDeleteSuccessMessage(
        "Basket was deleted! It will no longer display on the home page."
      );
      setTimeout(() => setDeleteSuccessMessage(""), 3000);
    } catch (error) {
      console.error("❌ Error deleting basket:", error);
    }
  };

  const handleDeleteAllClick = () => {
    setIsDeleteAllConfirmOpen(true);
  };

  const confirmDeleteAllBaskets = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/baskets/admin`, {
        method: "DELETE",
      });
      setBasketModified(true); // Trigger re-fetch of baskets after deleting all
    } catch (error) {
      console.error("Failed to delete all baskets", error);
    } finally {
      setIsDeleteAllConfirmOpen(false);
    }
  };

  const cancelDeleteAllBaskets = () => {
    setIsDeleteAllConfirmOpen(false);
  };

  const cancelDeleteBasket = () => {
    setBasketToDelete(null);
    setIsDeleteBasketConfirmOpen(false);
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <button onClick={() => handleLogout(navigate)} className="logout-button">
          Log Out
        </button>
        <h1>🎗 Admin Control Panel 🎗</h1>
      </div>

      <button onClick={openCreateBasket} className="create-basket-button">
        Create New Basket
      </button>

      {basketData.length > 0 ? (
        <div className="carousel-container">
          <div className="basket-display">
            <h3>
              #{currentIndex + 1} {basketData[currentIndex]?.name || "No Name"}
            </h3>
            <p>{basketData[currentIndex]?.content || "No Content"}</p>

            <div className="admin-buttons">
              <button onClick={() => openEditBasket(basketData[currentIndex])} className="edit-button">
                Edit
              </button>
              <button onClick={() => handleDeleteClick(basketData[currentIndex]._id)} className="delete-button">
                Delete
              </button>
            </div>
          </div>

          <div className="carousel-arrows">
            <button
              onClick={() => setCurrentIndex(prev => prev > 0 ? prev - 1 : basketData.length - 1)}
              className="carousel-button left">
              <FaArrowLeft />
            </button>
            <button
              onClick={() => setCurrentIndex(prev => prev < basketData.length - 1 ? prev + 1 : 0)}
              className="carousel-button right">
              <FaArrowRight />
            </button>
          </div>
        </div>
      ) : (
        <p>No baskets available. Please create a new basket.</p>
      )}

      <BasketForm
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        editingBasket={editingBasket}
      />

      {showConfirmationModal && (
        <div className="modal-overlay show">
          <div className="modal show">
            <h2>Success!</h2>
            <p>You successfully added a basket! Would you like to add another basket?</p>
            <div className="modal-buttons">
              <button onClick={openCreateBasket} className="modal-button">
                Yes
              </button>
              <button onClick={closeConfirmationModal} className="modal-button">
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteBasketConfirmOpen && (
        <div className="modal-overlay show">
          <div className="modal show">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this basket? This action cannot be undone.</p>
            <div className="modal-buttons">
              <button onClick={confirmDeleteBasket} className="modal-button delete">
                Yes, Delete
              </button>
              <button onClick={cancelDeleteBasket} className="modal-button cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteSuccessMessage && <p className="success-message">{deleteSuccessMessage}</p>}

      <button onClick={handleDeleteAllClick}>Delete All Baskets</button>

      {isDeleteAllConfirmOpen && (
        <div className="modal-overlay show">
          <div className="modal show">
            <h2>Confirm Delete All Baskets</h2>
            <p>Are you sure you want to delete all baskets? This action cannot be undone.</p>
            <div className="modal-buttons">
              <button onClick={confirmDeleteAllBaskets} className="modal-button delete">
                Yes, Delete All
              </button>
              <button onClick={cancelDeleteAllBaskets} className="modal-button cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMain;
