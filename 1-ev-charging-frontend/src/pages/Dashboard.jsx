import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCarBattery,
  FaHistory,
  FaUserCircle,
  FaMoneyBillWave
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css"; // ✅ CSS Included

const Dashboard = () => {
  const navigate = useNavigate(); // ✅ useNavigate Hook

  const sections = [
    {
      title: "Book a Charging Slot",
      icon: <FaCarBattery size={50} className="text-primary icon-style" />,
      path: "/booking"
    },
    {
      title: "View Charging History",
      icon: <FaHistory size={50} className="text-warning icon-style" />,
      path: "/history"
    },
    {
      title: "Profile & Settings",
      icon: <FaUserCircle size={50} className="text-success icon-style" />,
      path: "/profile"
    },
    // {
    //   title: "Payments & Wallet",
    //   icon: <FaMoneyBillWave size={50} className="text-danger icon-style" />,
    //   path: "/payments"
    // }
  ];

  return (
    <div className="dashboard-container">
      <div className="overlay"></div>{" "}
      {/* ✅ Dark overlay added for better text visibility */}
      <div className="content text-white text-center">
        <h1 className="fw-bold title-glow">🚗 EV Charging Dashboard</h1>
        <p className="subtext">Manage your charging & payments easily.</p>

        <div className="row row-cols-1 row-cols-md-2 g-4 mt-4">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="col"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(section.path)}
              style={{ cursor: "pointer" }}
            >
              <div className="card card-glass">
                <div className="icon-container">{section.icon}</div>
                <h5 className="fw-bold card-title">{section.title}</h5>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
