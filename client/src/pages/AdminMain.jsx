import React, { useContext, useState } from "react";
import { BasketContext } from "../App";
import { Link } from "react-router-dom";

const AdminMain = () => {
  const { basketData, username, handleLogin, handleLogout } = useContext(BasketContext);
  const [tempUsername, setTempUsername] = useState("");

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
          <button onClick={() => handleLogin(tempUsername)} className="login-button">
            Submit
          </button>
        </div>
      ) : (
        <div>
          <p>Welcome, <strong>{username}</strong>!</p>
          <button onClick={handleLogout} className="logout-button">Log Out</button>

          {/* ✅ Create Basket Button */}
          <div className="admin-actions">
            <Link to="/administrator/basketform">
              <button className="create-basket-button">Create Basket</button>
            </Link>
          </div>

        
  
        </div>
      )}
    </div>
  );
};

export default AdminMain;
