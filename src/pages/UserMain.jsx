import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "./UserMain.css";

const UserMain = () => {
  const { favorites, setFavorites, basketData } = useOutletContext();
  const [username, setUsername] = useState(""); // Temporary input state
  const [submittedUsername, setSubmittedUsername] = useState(() => localStorage.getItem("username") || ""); // Saved username

  useEffect(() => {
    if (submittedUsername) {
      localStorage.setItem("username", submittedUsername); // ✅ Save username only after submission
    }
  }, [submittedUsername]);

  const handleSubmitUsername = () => {
    if (username.trim() !== "") {
      setSubmittedUsername(username.trim()); // ✅ Save only after clicking submit
    }
  };

  const handleFav = (id) => {
    if (!submittedUsername) return; // ✅ Prevent adding favorites if no username

    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id) // Remove if already a favorite
        : [...prevFavorites, id]; // Add if not a favorite

      console.log("Updated Favorites:", newFavorites); // ✅ Debugging log
      return newFavorites;
    });
  };

  return (
    <div>
      <section className="container">
        <h1 className="basket-title">Bunco Baskets</h1>

        {/* ✅ Username Input & Submit Button */}
        <div className="username-container">
          {!submittedUsername ? (
            <>
              <input
                type="text"
                placeholder="Enter your name to save your favorite baskets"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button onClick={handleSubmitUsername}>Submit</button>
            </>
          ) : (
            <p>Welcome, <strong>{submittedUsername}</strong>!</p>
          )}
        </div>

        {/* ✅ Admin Check - Only After Submission */}
        {submittedUsername.toLowerCase() === "administrator" && <p>🔑 Admin Mode: You can manage baskets.</p>}

        {basketData.map((basket) => (
          <div key={basket.id} className="basket-container">
            {/* ✅ Show "Add to Favorites" ONLY if username was submitted */}
            {submittedUsername && (
              <button onClick={() => handleFav(basket.id)}>
                {favorites.includes(basket.id) ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            )}
            <h2>{`#${basket.id}: ${basket.name}`}</h2>
            <ul>
              {basket.content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default UserMain;
