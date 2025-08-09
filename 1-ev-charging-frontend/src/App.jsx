import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Booking from "./components/Booking";
import History from "./pages/History";
import Profile from "./pages/Profile";
import BookingPage from "./pages/BookingPage";
import Payment from "./components/Payment";
import StationCard from "./components/StationCard";
import PaymentSuccessPoP from "./components/PaymentSuccessPoP"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/" element={<StationCard />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccessPoP />} />
      </Routes>
    </Router>
  );
}

export default App;
