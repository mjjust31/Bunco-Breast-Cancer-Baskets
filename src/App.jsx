import React, { useState } from "react";
import "./App.css";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [currentView, setCurrentView] = useState("dashboard"); // Default to dashboard

  return (
    <div>
      <div>
        {/* Toggle between different views */}
        <button onClick={() => setCurrentView("dashboard")}>Admin Dashboard</button>
      </div>

      {/* Render the selected component */}
      {currentView === "dashboard" && <AdminDashboard />}
    </div>
  );
}

export default App;
