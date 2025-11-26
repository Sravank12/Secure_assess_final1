import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { servicesAPI, bookingsAPI } from '../services/api';

function BookService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [formData, setFormData] = useState({
    booking_date: '',
    booking_time: '10:00',
    location: '',
    privacy_level: 'standard',
    card_number: '',
    card_name: '',
    card_expiry: '',
    card_cvv: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [platformFee, setPlatformFee] = useState(0);

  useEffect(() => {
    loadService();
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, booking_date: today }));
  }, [id]);

  useEffect(() => {
    if (service) {
      const fee = (service.price * 0.05).toFixed(2);
      setPlatformFee(fee);
    }
  }, [service]);

  const loadService = async () => {
    try {
      const response = await servicesAPI.getOne(id);
      setService(response.data);
    } catch (error) {
      console.error('Error loading service:', error);
      setError('Could not load service details');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const bookingData = {
        service_id: parseInt(id),
        ...formData
      };
      
      const response = await bookingsAPI.create(bookingData);
      alert(`Booking successful! Your OTP code is: ${response.data.otp_code}`);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!service) return <Container className="mt-4">Loading...</Container>;

  return (
    <Container className="mt-4">
      <h2>Book Service</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Header>
              <h5>Service Details</h5>
            </Card.Header>
            <Card.Body>
              <h4>{service.title}</h4>
              <p>{service.description}</p>
              <h5 className="text-primary">${service.price}</h5>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Header>
              <h5>Booking Details</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Date *</Form.Label>
                  <Form.Control
                    type="date"
                    name="booking_date"
                    value={formData.booking_date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Time *</Form.Label>
                  <Form.Control
                    type="time"
                    name="booking_time"
                    value={formData.booking_time}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Location *</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter your full address"
                    required
                  />
                  <Form.Text className="text-muted">
                    Your location will be hashed for privacy
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Privacy Level</Form.Label>
                  <Form.Select name="privacy_level" value={formData.privacy_level} onChange={handleChange}>
                    <option value="standard">Standard</option>
                    <option value="high">High Privacy</option>
                    <option value="maximum">Maximum Privacy</option>
                  </Form.Select>
                </Form.Group>

                <hr />

                <h5 className="mb-3">💳 Payment Information</h5>
                <Alert variant="warning">
                  <small>
                    <strong>Demo Payment:</strong> This is a dummy payment system. 
                    Any card number (13-16 digits) will work. No real transactions are processed.
                  </small>
                </Alert>

                <Form.Group className="mb-3">
                  <Form.Label>Cardholder Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="card_name"
                    value={formData.card_name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Card Number *</Form.Label>
                  <Form.Control
                    type="text"
                    name="card_number"
                    value={formData.card_number}
                    onChange={handleChange}
                    placeholder="4111 1111 1111 1111"
                    maxLength="16"
                    required
                  />
                  <Form.Text className="text-muted">
                    Test card: 4111 1111 1111 1111
                  </Form.Text>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Expiry Date *</Form.Label>
                      <Form.Control
                        type="text"
                        name="card_expiry"
                        value={formData.card_expiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>CVV *</Form.Label>
                      <Form.Control
                        type="text"
                        name="card_cvv"
                        value={formData.card_cvv}
                        onChange={handleChange}
                        placeholder="123"
                        maxLength="3"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit" variant="success" className="w-100" size="lg" disabled={loading}>
                  {loading ? 'Processing...' : `💳 Pay $${service.price} & Book Service`}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header>
              <h5>Payment Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Service Price:</span>
                <strong>${service.price}</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Platform Fee (5%):</span>
                <strong>${platformFee}</strong>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                <strong className="text-primary">${service.price}</strong>
              </div>
              <Alert variant="info" className="mt-3 mb-0">
                <small>
                  💰 Payment will be held in escrow until service completion.
                  Provider receives ${(service.price - platformFee).toFixed(2)}.
                </small>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default BookService;
