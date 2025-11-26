import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Modal, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { bookingsAPI, statsAPI } from '../services/api';

function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({});
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [otpCode, setOtpCode] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [bookingsRes, statsRes] = await Promise.all([
        bookingsAPI.getAll(),
        statsAPI.getDashboard()
      ]);
      setBookings(bookingsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
      setMessage({ type: 'danger', text: 'Error loading dashboard data' });
    }
  };

  const handleVerifyOTP = async () => {
    try {
      await bookingsAPI.verifyOTP(selectedBooking.id, otpCode);
      setMessage({ type: 'success', text: 'OTP verified successfully!' });
      setShowOTPModal(false);
      setOtpCode('');
      loadData();
    } catch (error) {
      setMessage({ type: 'danger', text: 'Invalid OTP code!' });
    }
  };

  const handleComplete = async (bookingId) => {
    try {
      const response = await bookingsAPI.complete(bookingId);
      setMessage({ 
        type: 'success', 
        text: `Service completed! Payment transferred: $${response.data.payment_transferred}` 
      });
      loadData();
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error completing booking' });
    }
  };

  return (
    <Container className="mt-4">
      <h2>Dashboard</h2>
      
      {message.text && (
        <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })}>
          {message.text}
        </Alert>
      )}
      
      <Row className="mb-4">
        <Col md={3}>
          <Card>
            <Card.Body>
              <h5>Total Bookings</h5>
              <h2>{stats.total_bookings || 0}</h2>
            </Card.Body>
          </Card>
        </Col>
        {user?.role === 'provider' && (
          <>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <h5>Total Services</h5>
                  <h2>{stats.total_services || 0}</h2>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <h5>Completed</h5>
                  <h2>{stats.completed_bookings || 0}</h2>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <h5>Total Earnings</h5>
                  <h2>${stats.total_earnings?.toFixed(2) || '0.00'}</h2>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}
      </Row>

      <Card>
        <Card.Header>
          <h5>My Bookings</h5>
        </Card.Header>
        <Card.Body>
          {bookings.length === 0 ? (
            <p className="text-center text-muted">No bookings yet</p>
          ) : (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Amount</th>
                  {user?.role === 'client' && <th>OTP</th>}
                  {user?.role === 'provider' && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.booking_date}</td>
                    <td>{booking.booking_time}</td>
                    <td>
                      <Badge bg={
                        booking.status === 'completed' ? 'success' :
                        booking.status === 'confirmed' ? 'primary' : 'warning'
                      }>
                        {booking.status}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg={
                        booking.payment_status === 'transferred' ? 'success' :
                        booking.payment_status === 'paid_held' ? 'info' : 'warning'
                      }>
                        {booking.payment_status}
                      </Badge>
                    </td>
                    <td>${booking.amount?.toFixed(2)}</td>
                    {user?.role === 'client' && (
                      <td><code>{booking.otp_code}</code></td>
                    )}
                    {user?.role === 'provider' && (
                      <td>
                        {!booking.otp_verified && (
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => {
                              setSelectedBooking(booking);
                              setShowOTPModal(true);
                            }}
                          >
                            Verify OTP
                          </Button>
                        )}
                        {booking.otp_verified && booking.status !== 'completed' && (
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => handleComplete(booking.id)}
                          >
                            Complete
                          </Button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal show={showOTPModal} onHide={() => setShowOTPModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Verify OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Enter OTP Code</Form.Label>
            <Form.Control
              type="text"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength="6"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOTPModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleVerifyOTP}>
            Verify
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Dashboard;
