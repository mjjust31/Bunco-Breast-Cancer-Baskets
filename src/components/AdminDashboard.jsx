import React from "react";
import basketData from "../data/basketsData";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div>
      <section className="container">
        <h1 className="basket-title">Bunco Baskets</h1>
        
        {/* Mapping through baskets and displaying each one */}
        {basketData.map((basket) => (
          <div key={basket.id} className="basket-container">
            <h2>{basket.name}</h2>
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

export default AdminDashboard;
