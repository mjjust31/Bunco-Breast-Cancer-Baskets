import React from "react";


function ErrorPage() {
  return (
    <div className="error-container" style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ fontSize: "48px", color: "#dc3545" }}>404</h1>
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" style={{ textDecoration: "none", color: "#007bff", fontSize: "18px" }}>
        Go Back to Home
      </Link>
    </div>
  );
}

export default ErrorPage;