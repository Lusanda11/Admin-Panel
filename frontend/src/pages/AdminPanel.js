// ****************** AdminPanel.js *********************


// Import necessary modules.
// ----------------------------------------------------------------------------------------------------------------------------
    import React from "react";
    import { Container, Row, Col } from "react-bootstrap";
    import Dashboard from "../components/Dashboard";
    import InfluencerList from "../components/InfluencerList";
    import ResearchConfig from "../components/ResearchConfig";
// ----------------------------------------------------------------------------------------------------------------------------


// Defining the AdminPanel Functional Component.
// ----------------------------------------------------------------------------------------------------------------------------
    const AdminPanel = () =>
    {
        return (
            <Container fluid className="mt-4">     {/* Bootstrap Grid Layout for Admin Panel */}
              <Row>
                <Col md={3}>
                  <h3>Admin Dashboard</h3>
                  <ResearchConfig />
                </Col>
                <Col md={6}>
                  <Dashboard />
                </Col>
                <Col md={3}>
                  <InfluencerList />
                </Col>
              </Row>
            </Container>
        );
    };
// ----------------------------------------------------------------------------------------------------------------------------


export default AdminPanel; // Export necessary modules.
