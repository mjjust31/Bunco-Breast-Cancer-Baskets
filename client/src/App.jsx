import React, { useContext, useState } from "react";
import { Outlet, useLocation } from "react-router-dom"; // ✅ Import useLocation
import "./App.css";
import Nav from "./components/NavTabs";
import { BasketContext } from "./context/BasketContext"; // ✅ Import Context

function App() {
  const { basketData, username } = useContext(BasketContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const location = useLocation(); // ✅ Get current route

  // ✅ Hide the basket carousel on /favorites page
  const hideCarousel = location.pathname === "/favorites";

  // ✅ Handle carousel navigation
  const prevBasket = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : basketData.length - 1));
  };

  const nextBasket = () => {
    setCurrentIndex((prev) => (prev < basketData.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      <Nav username={username} />
      <main className="mx-3">
        <Outlet /> {/* ✅ Renders UserMain, AdminMain, etc. */}

        {/* ✅ Show Basket Carousel on all pages except Favorites */}
        {!hideCarousel && (
          <section className="global-baskets">
            <h2>Available Baskets</h2>
            {basketData.length === 0 ? (
              <p>No baskets available.</p>
            ) : (
              <div className="basket-carousel">
                <button onClick={prevBasket} className="carousel-button left">◀</button>

                <div className="basket-display">
                  <h3>#{currentIndex + 1} {basketData[currentIndex].name}</h3>
                  <p>{basketData[currentIndex].content}</p>
                </div>

                <button onClick={nextBasket} className="carousel-button right">▶</button>
              </div>
            )}
          </section>
        )}
      </main>
    </>
  );
}

export default App;
