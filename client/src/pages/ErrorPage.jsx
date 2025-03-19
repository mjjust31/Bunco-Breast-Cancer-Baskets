import React from "react";
import { useNavigate } from "react-router-dom";
import "./ErrorPage.scss"; // ✅ Add some styling

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <h1>Oops! Page Not Found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <button onClick={() => navigate("/")}>Go Back Home</button>
    </div>
  );
};

export default ErrorPage;
