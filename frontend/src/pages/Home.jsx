import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <div className="text-center mb-5">
            <h1 className="display-4">Home Care</h1>
            <p className="lead">Privacy-by-design platform for safe home services during COVID-19</p>
          </div>

          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>🔒 Privacy First</Card.Title>
                  <Card.Text>
                    Anonymous contact tracing with SHA-256 encryption. Your identity stays protected.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>💳 Secure Payments</Card.Title>
                  <Card.Text>
                    Escrow-based payment system. Funds released only after service completion.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>🔐 OTP Verification</Card.Title>
                  <Card.Text>
                    Two-factor authentication for service completion. Enhanced security.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div className="text-center mt-5">
            {isAuthenticated ? (
              <Button as={Link} to="/dashboard" variant="primary" size="lg">
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button as={Link} to="/register" variant="primary" size="lg" className="me-3">
                  Get Started
                </Button>
                <Button as={Link} to="/login" variant="outline-primary" size="lg">
                  Login
                </Button>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
