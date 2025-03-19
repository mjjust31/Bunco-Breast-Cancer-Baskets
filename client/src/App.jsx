import React, { useContext } from "react";
import { Outlet } from "react-router-dom"; 
import "./App.css";
import Nav from "./components/NavTabs";
import { BasketContext } from "./context/BasketContext"; 

function App() {
  const { username } = useContext(BasketContext);

  return (
    <>
      <Nav username={username} />
      <main className="mx-3">
        <Outlet /> {/* ✅ Renders UserMain, AdminMain, etc. */}
      </main>
    </>
  );
}

export default App;
