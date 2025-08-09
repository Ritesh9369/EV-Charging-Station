import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, Form, Spinner, Alert } from "react-bootstrap";
import "../styles/payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state || {}; // Get booking details from the previous page

  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: ""
  });
  const [error, setError] = useState("");

  // Simulate loading effect
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  // Function to validate card details
  const validateCardDetails = () => {
    const { cardNumber, expiry, cvv } = paymentDetails;
    const cardRegex = /^[0-9]{16}$/; // 16-digit card number
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/; // MM/YY format
    const cvvRegex = /^[0-9]{3,4}$/; // 3 or 4-digit CVV

    if (!cardRegex.test(cardNumber))
      return "Invalid Card Number (16 digits required).";
    if (!expiryRegex.test(expiry))
      return "Invalid Expiry Date (Format: MM/YY).";
    if (!cvvRegex.test(cvv)) return "Invalid CVV (3 or 4 digits required).";
    return "";
  };

  // Handle input change in payment fields
  const handleInputChange = (field, value) => {
    setPaymentDetails({ ...paymentDetails, [field]: value });
    setError(""); // Remove error when user enters valid input
  };

  // Function to handle payment confirmation
  const handleConfirmPayment = async () => {
    const validationError = validateCardDetails();
    if (validationError) {
      setError(validationError);
      return;
    }

    // Prepare booking data
    const bookingData = {
      user_id: 1, // Replace with logged-in user ID
      user_name: bookingDetails.userName,
      station_name: bookingDetails.station.name,
      station_address: bookingDetails.station.address,
      booking_date: bookingDetails.date,
      booking_time: bookingDetails.time,
      price: bookingDetails.station.price
    };

    try {
      // Save booking in database
      const bookingResponse = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData)
      });

      const bookingResult = await bookingResponse.json();
      if (!bookingResult.success) {
        setError("Booking failed! Please try again.");
        return;
      }

      // Prepare payment data
      const paymentData = {
        booking_id: bookingResult.booking_id,
        user_id: 1, // Replace with logged-in user ID
        card_number: paymentDetails.cardNumber,
        expiry: paymentDetails.expiry,
        cvv: paymentDetails.cvv,
        amount_paid: bookingDetails.station.price
      };

      // Save payment in database
      const paymentResponse = await fetch("http://localhost:5000/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData)
      });

      const paymentResult = await paymentResponse.json();
      if (!paymentResult.success) {
        setError("Payment failed! Please try again.");
        return;
      }

      alert("Payment Successful! ✅");
      navigate("/payment-success");
    } catch (error) {
      setError("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="payment-container">
      <Card className="payment-card">
        {loading ? (
          <div className="loading-animation">
            <Spinner animation="border" variant="primary" />
            <p>Redirect To Payment</p>
          </div>
        ) : (
          <>
            <h2 className="text-center mb-4">Confirm Your Booking</h2>
            <Card.Body>
              <p>
                <strong>Name:</strong> {bookingDetails.userName}
              </p>
              <p>
                <strong>Station:</strong> {bookingDetails.station?.name}
              </p>
              <p>
                <strong>Address:</strong> {bookingDetails.station?.address}
              </p>
              <p>
                <strong>Date:</strong> {bookingDetails.date}
              </p>
              <p>
                <strong>Time:</strong> {bookingDetails.time}
              </p>
              <p>
                <strong>Price:</strong> ₹{bookingDetails.station?.price} / hour
              </p>

              <h4 className="mt-3">Enter Card Details</h4>
              <Form className="payment-form mt-3">
                <Form.Control
                  type="text"
                  placeholder="Card Number (16 digits)"
                  maxLength="16"
                  value={paymentDetails.cardNumber}
                  onChange={(e) =>
                    handleInputChange(
                      "cardNumber",
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                />
                <Form.Control
                  type="text"
                  placeholder="Expiry (MM/YY)"
                  maxLength="5"
                  value={paymentDetails.expiry}
                  onChange={(e) => handleInputChange("expiry", e.target.value)}
                />
                <Form.Control
                  type="password"
                  placeholder="CVV"
                  maxLength="4"
                  value={paymentDetails.cvv}
                  onChange={(e) =>
                    handleInputChange("cvv", e.target.value.replace(/\D/g, ""))
                  }
                />
              </Form>

              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}

              <Button
                className="confirm-btn mt-4"
                onClick={handleConfirmPayment}
              >
                ✅ Confirm & Pay
              </Button>
            </Card.Body>
          </>
        )}
      </Card>
    </div>
  );
};

export default Payment;
