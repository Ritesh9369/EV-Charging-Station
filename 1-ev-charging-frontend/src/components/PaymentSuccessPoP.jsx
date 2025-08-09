import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import "../styles/PaymentSuccessPoP.css";

const PaymentSuccessPoP = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow-lg text-center p-4 success-card slide-up">
        <div className="icon-container">
          <FaCheckCircle className="success-icon" />
        </div>
        <h2 className="text-success">Payment Successful!</h2>
        <p className="text-muted">
          Your EV charging slot has been booked successfully.
        </p>
        <Button variant="success" onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </Button>
      </Card>
    </Container>
  );
};

export default PaymentSuccessPoP;
