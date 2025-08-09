import React, { useState } from "react";
import { Card, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "../styles/stationCard.css";

const StationCard = ({ station, onBook }) => {
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

 const handleBook = () => {
   const selectedDateTime = new Date(`${date}T${time}`);
   const currentDateTime = new Date();

   if (!userName || !date || !time) {
     setError("All fields are required.");
     return;
   }

   if (selectedDateTime < currentDateTime) {
     setError("Please select a valid date and time.");
     return;
   }

   setError("");
   setShowModal(false);

   // Redirect to Payment page with booking details
   navigate("/payment", { state: { station, userName, date, time } });
 };


  return (
    <Card className="station-card">
      <Card.Body>
        <Card.Title>{station.name}</Card.Title>
        <Card.Text>
          <strong>Address:</strong> {station.address} <br />
          <strong>Price:</strong> ₹{station.price} / hour <br />
          <strong>Availability:</strong>{" "}
          {station.available ? "Available" : "Full"} <br />
          <strong>Slots:</strong> {station.slots} left
        </Card.Text>
        <Button
          className="book-btn"
          disabled={!station.available}
          onClick={() => setShowModal(true)}
        >
          Book Slot
        </Button>
      </Card.Body>

      {/* Booking Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Book Charging Slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Select Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Select Time</Form.Label>
              <Form.Control
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Form.Group>

            {error && <p className="text-danger mt-2">{error}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleBook}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default StationCard;
