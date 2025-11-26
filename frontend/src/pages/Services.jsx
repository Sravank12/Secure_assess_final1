import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { servicesAPI } from '../services/api';

function Services() {
  const [services, setServices] = useState([]);
  const [serviceType, setServiceType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, [serviceType]);

  const loadServices = async () => {
    try {
      setLoading(true);
      const response = await servicesAPI.getAll(serviceType || null);
      setServices(response.data);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col md={8}>
          <h2>Available Services</h2>
        </Col>
        <Col md={4}>
          <Form.Select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
            <option value="">All Services</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Gardening">Gardening</option>
            <option value="Moving">Moving</option>
            <option value="Painting">Painting</option>
          </Form.Select>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Row>
          {services.map((service) => (
            <Col md={4} key={service.id} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{service.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {service.service_type}
                  </Card.Subtitle>
                  <Card.Text>{service.description}</Card.Text>
                  <h4 className="text-primary">${service.price}</h4>
                  <div className="mb-2">
                    <small className="text-muted">
                      📍 {service.location_area} • {service.max_distance}km radius
                    </small>
                  </div>
                  <Button as={Link} to={`/services/${service.id}`} variant="primary">
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {!loading && services.length === 0 && (
        <div className="text-center mt-5">
          <p className="text-muted">No services available</p>
        </div>
      )}
    </Container>
  );
}

export default Services;
