import React, { useState, useEffect } from "react";

const BasketForm = ({ onAddBasket, onClose, editBasket }) => {
  const [basketName, setBasketName] = useState("");
  const [basketContent, setBasketContent] = useState("");

  // ✅ Pre-fill form if editing
  useEffect(() => {
    if (editBasket) {
      setBasketName(editBasket.name);
      setBasketContent(editBasket.content);
    }
  }, [editBasket]);

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ Prevent page reload

    if (basketName.trim() === "" || basketContent.trim() === "") {
      alert("Please enter both a basket name and content.");
      return;
    }

    if (editBasket) {
      // ✅ Editing existing basket
      onAddBasket({ ...editBasket, name: basketName, content: basketContent });
    } else {
      // ✅ Adding new basket
      onAddBasket({ name: basketName, content: basketContent });
    }

    // ✅ Clear Form & Close Modal
    setBasketName("");
    setBasketContent("");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Basket Name"
        value={basketName}
        onChange={(e) => setBasketName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Content"
        value={basketContent}
        onChange={(e) => setBasketContent(e.target.value)}
      />
      <button type="submit">{editBasket ? "Update Basket" : "Save Basket"}</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default BasketForm;
