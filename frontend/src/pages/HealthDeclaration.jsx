import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { healthAPI } from '../services/api';

function HealthDeclaration() {
  const [formData, setFormData] = useState({
    declaration_date: new Date().toISOString().split('T')[0],
    symptoms: '',
    temperature: '',
    covid_test_result: 'negative'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        temperature: formData.temperature ? parseFloat(formData.temperature) : null
      };
      
      const response = await healthAPI.submitDeclaration(submitData);
      
      setSuccess(`Health declaration submitted successfully!`);
      
      if (formData.covid_test_result === 'positive') {
        setSuccess(prev => 
          `${prev} Contact tracing has been triggered. ${response.data.contacts_traced} contacts notified.`
        );
      }
      
      // Reset form
      setFormData({
        declaration_date: new Date().toISOString().split('T')[0],
        symptoms: '',
        temperature: '',
        covid_test_result: 'negative'
      });
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to submit declaration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <h2 className="mb-4">COVID-19 Health Declaration</h2>
          
          <Alert variant="info">
            <strong>Privacy Notice:</strong> Your health information is encrypted and stored securely. 
            If you test positive, anonymous contact tracing will be triggered to protect others.
          </Alert>
          
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Declaration Date *</Form.Label>
              <Form.Control
                type="date"
                name="declaration_date"
                value={formData.declaration_date}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Symptoms</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                placeholder="List any symptoms: fever, cough, headache, etc. (optional)"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Body Temperature (°C)</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                min="35"
                max="42"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                placeholder="37.0"
              />
              <Form.Text className="text-muted">
                Normal range: 36.1°C - 37.2°C
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>COVID-19 Test Result *</Form.Label>
              <Form.Select 
                name="covid_test_result" 
                value={formData.covid_test_result} 
                onChange={handleChange}
                required
              >
                <option value="negative">Negative</option>
                <option value="positive">Positive</option>
                <option value="pending">Pending</option>
                <option value="not_tested">Not Tested</option>
              </Form.Select>
            </Form.Group>

            {formData.covid_test_result === 'positive' && (
              <Alert variant="danger">
                <strong>⚠️ Important:</strong> If you test positive, all recent contacts will be 
                notified anonymously. Please self-isolate according to local health guidelines.
              </Alert>
            )}

            <div className="d-grid gap-2">
              <Button type="submit" variant="primary" size="lg" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Declaration'}
              </Button>
            </div>
          </Form>

          <hr className="my-4" />

          <h5>Why Submit a Health Declaration?</h5>
          <ul>
            <li>Protect yourself and others in the community</li>
            <li>Enable anonymous contact tracing if positive</li>
            <li>Help health authorities track outbreaks</li>
            <li>All data is encrypted and privacy-preserved</li>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default HealthDeclaration;
