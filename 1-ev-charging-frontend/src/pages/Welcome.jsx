import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Welcome.css"; // CSS ko import karein

const Welcome = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true); // Animation start karna

    // 4 sec ke baad Dashboard pe redirect
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`welcome-container ${fadeIn ? "fade-in" : ""}`}>
      <div className="overlay"></div> {/* Dark Overlay for readability */}
      <div className="content">
        <div className="card p-4 shadow-lg text-center welcome-card">
          <h1 className="fw-bold glowing-text">
            🚗⚡Welcome to EV Charging Station!
          </h1>
          <p className="mt-3 text-light">
            Your account has been created successfully!
          </p>

          {/* Loading Spinner */}
          <div className="spinner-border text-light mt-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>

          <p className="mt-2 text-light">Redirecting to Dashboard...</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
