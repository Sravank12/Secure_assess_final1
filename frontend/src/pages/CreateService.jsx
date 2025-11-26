import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { servicesAPI } from '../services/api';

function CreateService() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    service_type: 'Cleaning',
    title: '',
    description: '',
    price: '',
    location_area: '',
    covid_safe: true,
    max_distance: 10
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const serviceData = {
        ...formData,
        price: parseFloat(formData.price),
        max_distance: parseInt(formData.max_distance)
      };
      
      await servicesAPI.create(serviceData);
      alert('Service created successfully!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <h2 className="mb-4">Create New Service</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Service Type *</Form.Label>
              <Form.Select name="service_type" value={formData.service_type} onChange={handleChange} required>
                <option value="Cleaning">Cleaning</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Gardening">Gardening</option>
                <option value="Moving">Moving</option>
                <option value="Painting">Painting</option>
                <option value="Renovation">Renovation</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Service Title *</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Professional House Cleaning"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your service in detail..."
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price (USD) *</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                min="0"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="100.00"
                required
              />
              <Form.Text className="text-muted">
                Note: 5% platform fee will be deducted
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location Area *</Form.Label>
              <Form.Control
                type="text"
                name="location_area"
                value={formData.location_area}
                onChange={handleChange}
                placeholder="e.g., Adelaide CBD, North Adelaide"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Maximum Service Distance (km) *</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="100"
                name="max_distance"
                value={formData.max_distance}
                onChange={handleChange}
                required
              />
              <Form.Text className="text-muted">
                How far are you willing to travel?
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="covid_safe"
                checked={formData.covid_safe}
                onChange={handleChange}
                label="✅ This service follows COVID-19 safety protocols"
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button type="submit" variant="primary" size="lg" disabled={loading}>
                {loading ? 'Creating...' : 'Create Service'}
              </Button>
              <Button variant="outline-secondary" onClick={() => navigate('/dashboard')}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CreateService;
