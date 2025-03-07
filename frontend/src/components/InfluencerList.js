// ****************** InfluencerList.js *********************



// Import necessary modules.
// ----------------------------------------------------------------------------------------------------------------------------
    import React, { useEffect, useState } from "react"; // Imports necessary React hooks (useEffect, useState) and Bootstrap components.
    import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";
    import { getInfluencers } from "../api/influencerApi"; // Fetches influencer data from an API function (getInfluencers).
    import "../styles/InfluencerList.css"; // Import custom styles
// ----------------------------------------------------------------------------------------------------------------------------

// Component Definition & State Initialization.
const InfluencerList = () =>
{
// Uses useState to manage:
// ----------------------------------------------------------------------------------------------------------------------------
    const [influencers, setInfluencers] = useState([]); // influencers: The list of influencers.
    const [loading, setLoading] = useState(true); // influencers: The list of influencers.
    const [error, setError] = useState(null); // error: Captures any errors during fetching.
// ----------------------------------------------------------------------------------------------------------------------------

// Fetching Data on Component Mount.
// ----------------------------------------------------------------------------------------------------------------------------
    useEffect(() =>
    {
        const fetchInfluencers = async () =>
        {
            try
            {
                const data = await getInfluencers();
                if (!Array.isArray(data)) throw new Error("Invalid data format from server");
                setInfluencers(data);
            }
            catch (error)
            {
                console.error("❌ Error fetching influencers:", error);
                setError(error.message);
            }
            finally
            {
                setLoading(false);
            }
        };

        fetchInfluencers();
    }, []);
// ----------------------------------------------------------------------------------------------------------------------------

// Fetching Data on Component Mount.
/* -------------------------------------------------------------------------------------------------------------------------- *\
    Uses useEffect to fetch data only once when the component mounts ([] dependency array).
    Fetch function:
    Handles errors (try-catch).
    Validates response (Array.isArray(data)).
    Updates state properly (setInfluencers(data), setError(error.message)).
    Ensures cleanup (finally { setLoading(false); }).
\* -------------------------------------------------------------------------------------------------------------------------- */


// Loading State Handling.
// ----------------------------------------------------------------------------------------------------------------------------
    if (loading)
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status"> {/* Displays a spinner while loading. */}
                    <span className="visually-hidden">Loading...</span> {/* Provides accessible text (visually-hidden for screen readers). */}
                </Spinner>
                <p>Loading influencers...</p>
            </Container>
        );
// ----------------------------------------------------------------------------------------------------------------------------

// Error Handling.
// ----------------------------------------------------------------------------------------------------------------------------
    if (error)
        return (
            <Container className="text-center mt-5">
                <Alert variant="danger">⚠️ Error: {error}</Alert> {/* Displays a Bootstrap alert if an error occurs. */}
            </Container>
        );
// ----------------------------------------------------------------------------------------------------------------------------

// Handling Empty Data.
// ----------------------------------------------------------------------------------------------------------------------------
    if (influencers.length === 0)
        return (
            <Container className="text-center mt-5">
                <Alert variant="info">🔍 No influencers found.</Alert> {/* Shows an info alert if the API returns an empty list. */}
            </Container>
        );
// ----------------------------------------------------------------------------------------------------------------------------

// Displaying Influencer List.
    return (
        <Container className="mt-5">
          <h2 className="text-center mb-4">🌟 Top Health Influencers</h2>
          <Row className="justify-content-center"> {/* Uses Bootstrap grid (Row, Col) for responsive layout. */}
            {influencers.map((influencer, index) => (
              <Col md={4} sm={6} xs={12} key={index} className="mb-4">
                <Card className="influencer-card shadow-sm">
                  <div className="image-container">
                    <Card.Img
                      variant="top"
                      src={influencer.profile_image || "https://via.placeholder.com/150"} 
                      alt={influencer.name}
                      loading="lazy"
                      className="profile-img"
                    />
                  </div>
                  <Card.Body className="text-center">
                    <Card.Title className="influencer-name">{influencer.name}</Card.Title>
                    <Card.Text className="influencer-bio">{influencer.bio || "No bio available."}</Card.Text> {/* Default bio ("No bio available."). */}
                    <Card.Text className="text-muted">

                      {/* Uses toLocaleString() to format numbers properly. */}
                      <strong>👥 Followers:</strong> {influencer.followers ? influencer.followers.toLocaleString() : "N/A"} {/* "N/A" for missing follower count. */}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
    );
};

export default InfluencerList; // Export necessary modules.
