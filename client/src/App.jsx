import React from "react";
import { Outlet } from "react-router-dom"; 
import "./App.css";
import Nav from "./components/NavTabs/NavTabs"; // ✅ Nav already has access to context
import { BasketContextProvider } from "./context/BasketContext"; // ✅ Ensure Context is provided

function App() {
  return (
    <>
      <Nav /> {/* ✅ Removed unnecessary prop */}
      <main className="mx-3">
        <Outlet /> {/* ✅ Renders UserMain, AdminMain, etc. */}
      </main>
    </>
  );
}

export default App;
