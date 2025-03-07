// ****************** Home.js *********************


// Import necessary modules.
// ----------------------------------------------------------------------------------------------------------------------------
    import React from "react";
    import { Container, Row, Col, Button } from "react-bootstrap";
    import { useNavigate } from "react-router-dom";
    import "../styles/Home.css";
// ----------------------------------------------------------------------------------------------------------------------------


// Defining the Home Functional Component.
// ----------------------------------------------------------------------------------------------------------------------------
    const Home = () =>
    {
        const navigate = useNavigate();

        return (
            <Container className="home-container">  {/* Creating the Page Layout with Bootstrap Grid System. */}
              <Row className="justify-content-center">
                <Col md={8}>
                  <h1 className="glow-text">Welcome to Health Claims Verifier</h1> {/* Displaying a Welcome Message. */}
                  <p className="lead mt-3 glow-text">
                    Analyze and verify health claims from influencers using AI-powered research tools.
                  </p>
                  <Button className="glow-button mt-3" onClick={() => navigate("/adminpanel")}> {/* Navigation Button to Admin Panel */}
                    Go to Admin Panel
                  </Button>
                </Col>
              </Row>
            </Container>
        );
    };
// ----------------------------------------------------------------------------------------------------------------------------


export default Home; // Export necessary modules.
