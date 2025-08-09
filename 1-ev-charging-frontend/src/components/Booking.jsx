import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import StationCard from "./StationCard";
import MapComponent from "./MapComponent";
import Payment from "./Payment";
import "../styles/booking.css";

const Booking = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [bookingTime, setBookingTime] = useState(new Date());

  // Dummy station data (Replace with backend data later)
  const dummyStations = [
    {
      id: 1,
      name: "EV Station 1",
      address: "Location A",
      price: 50,
      available: true,
      slots: 3,
      lat: 19.076,
      lng: 72.8777
    },
    {
      id: 2,
      name: "EV Station 2",
      address: "Location B",
      price: 60,
      available: false,
      slots: 0,
      lat: 19.1,
      lng: 72.9
    }
  ];

  const handleSearch = () => {
    setStations(dummyStations);
  };

  const handleBook = (station) => {
    setSelectedStation(station);
  };

  return (
    <Container className="booking-container">
      <h2 className="text-center mt-4">Book a Charging Slot</h2>
      <Row className="mt-3">
        <Col md={6}>
          <Form.Group controlId="locationSearch">
            <Form.Label>Enter City/Area:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search nearest EV station..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
          </Form.Group>
          <Button className="search-btn" onClick={handleSearch}>
            Search
          </Button>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12}>
          <MapComponent stations={stations} />
        </Col>
      </Row>

      <Row className="mt-4">
        {stations.map((station) => (
          <Col md={4} key={station.id}>
            <StationCard station={station} onBook={handleBook} />
          </Col>
        ))}
      </Row>

      {selectedStation && (
        <>
          <Row className="mt-4">
            <Col md={6}>
              <h4>Select Date & Time</h4>
              <DatePicker
                selected={bookingTime}
                onChange={(date) => setBookingTime(date)}
                showTimeSelect
                dateFormat="Pp"
                className="form-control"
              />
            </Col>
          </Row>
          <Payment station={selectedStation} bookingTime={bookingTime} />
        </>
      )}
    </Container>
  );
};

export default Booking;
