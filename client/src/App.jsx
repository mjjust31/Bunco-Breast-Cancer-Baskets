import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Nav from "./components/NavTabs";
import { BasketContext } from "./context/BasketContext"; // ✅ Named Import

function App() {
  const { basketData, username } = useContext(BasketContext);

  return (
    <>
      <Nav username={username} />
      <main className="mx-3">
        <Outlet /> {/* ✅ Renders UserMain, AdminMain, etc. */}
        <section className="global-baskets">
          <h2></h2>
          {basketData.length === 0 ? (
           console.log("No baskets")// ✅ Shows message instead of empty list
          ) : (
            <ul className="basket-list">
              {basketData.map((basket, index) => (
                <li key={basket._id || index} className="basket-item">
                  <h3>{basket.name}</h3>
                  <p>{basket.content}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
