import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Card, Spinner, Alert } from "react-bootstrap";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = 1; // Replace with dynamic user ID when authentication is implemented

    axios
      .get("http://localhost:5000/api/history", { params: { user_id: userId } })
      .then((response) => {
        setHistory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
        setError("Failed to load history. Please try again.");
        setLoading(false);
      });
  }, []);

  return (
    <Container className="mt-5">
      <h1 className="text-primary text-center">📜 Charging History</h1>
      <p className="text-muted text-center">
        View your past charging sessions.
      </p>

      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
          <p>Loading history...</p>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && history.length > 0 ? (
        <Table striped bordered hover className="mt-4 text-center">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Station Name</th>
              <th>Address</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {history.map((session, index) => (
              <tr key={session.booking_id}>
                <td>{index + 1}</td>
                <td>{session.station_name}</td>
                <td>{session.station_address}</td>
                <td>{session.booking_date}</td>
                <td>{session.booking_time}</td>
                <td>{session.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        !loading && (
          <Card className="mt-4 p-3 text-center">
            <p>No charging history found.</p>
          </Card>
        )
      )}
    </Container>
  );
};

export default History;
