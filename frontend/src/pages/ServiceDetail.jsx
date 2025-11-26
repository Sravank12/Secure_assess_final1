import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button, Badge, Spinner } from 'react-bootstrap';
import { servicesAPI } from '../services/api';

function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadService();
  }, [id]);

  const loadService = async () => {
    try {
      const response = await servicesAPI.getOne(id);
      setService(response.data);
    } catch (error) {
      console.error('Error loading service:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!service) {
    return (
      <Container className="mt-4">
        <p>Service not found</p>
        <Button as={Link} to="/services">Back to Services</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h2>{service.title}</h2>
              <Badge bg="info">{service.service_type}</Badge>
              {service.covid_safe && <Badge bg="success" className="ms-2">COVID-Safe</Badge>}
            </div>
            <h3 className="text-primary">${service.price}</h3>
          </div>

          <Card.Text className="mb-4">{service.description}</Card.Text>

          <div className="mb-4">
            <strong>📍 Location:</strong> {service.location_area}<br />
            <strong>🚗 Service Radius:</strong> {service.max_distance} km<br />
            <strong>✅ COVID-Safe:</strong> {service.covid_safe ? 'Yes' : 'No'}
          </div>

          <div className="d-flex gap-2">
            <Button as={Link} to={`/book/${service.id}`} variant="success" size="lg">
              📅 Book This Service
            </Button>
            <Button as={Link} to="/services" variant="outline-secondary">
              ← Back to Services
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ServiceDetail;
