import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundImage from "../assets/images/Home-Page-Image.jpeg";

const Home = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-white text-center px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw"
      }}
    >
      <h1
        className="display-3 fw-bold mb-3 text-uppercase"
        style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.8)" }}
      >
        EV Charging Station
      </h1>
      <p
        className="lead mb-4 w-75"
        style={{
          fontSize: "1.2rem",
          maxWidth: "800px",
          textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
          lineHeight: "1.6"
        }}
      >
        ⚡ Welcome to our EV Charging Station platform! Easily find and book
        charging stations at your convenience. Get real-time availability and
        make your EV charging hassle-free.
      </p>

      <Link to="/login">
        <button className="btn btn-lg btn-primary px-4 py-2 rounded-3 shadow">
          🚀 Get Started
        </button>
      </Link>
    </div>
  );
};

export default Home;
