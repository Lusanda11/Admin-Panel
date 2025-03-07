// ****************** InfluencerDetail.js *********************



// Import necessary modules.
// ----------------------------------------------------------------------------------------------------------------------------
    import React, { useEffect, useState } from "react"; // Imports required hooks (useEffect, useState) and components.
    import { useParams } from "react-router-dom"; // Uses useParams to get the influencer's id from the URL.
    import { Container, Card, ListGroup, Spinner, Alert } from "react-bootstrap";
    import { searchInfluencer } from "../api/influencerApi"; // Imports the correct API function (searchInfluencer) for fetching influencer details.
// ----------------------------------------------------------------------------------------------------------------------------


const InfluencerDetail = () =>
{
// State Management.
// ----------------------------------------------------------------------------------------------------------------------------
    const { id } = useParams(); // Get influencer username from URL params
    const [influencer, setInfluencer] = useState(null); // influencer: Stores influencer details.
    const [loading, setLoading] = useState(true); // loading: Tracks API loading state.
    const [error, setError] = useState(null); // error: Stores error messages if any occur.
// ----------------------------------------------------------------------------------------------------------------------------


// Fetching Data (useEffect).
// ----------------------------------------------------------------------------------------------------------------------------
    useEffect(() =>
    {
        const fetchInfluencer = async () =>
        {
            try
            {
                setLoading(true);
                const data = await searchInfluencer(id); // Uses useEffect to fetch influencer data when id changes.

                if (!data || Object.keys(data).length === 0)
                {
                    setError("Influencer not found.");
                    return;
                }

                setInfluencer(data);
            }
            catch (err)
            {
                setError("Error fetching influencer details.");
                console.error("❌ Fetch error:", err);  // Handles errors correctly by setting setError when fetching fails.
            }
            finally
            {
                setLoading(false); // Uses finally to ensure setLoading(false) runs regardless of success or failure.
            }
        };

        fetchInfluencer();
    }, [id]);
// ----------------------------------------------------------------------------------------------------------------------------

// Loading State UI.
// ----------------------------------------------------------------------------------------------------------------------------
    if (loading)
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status"> {/* Displays a Spinner while data is being fetched. */}
                  <span className="visually-hidden">Loading influencer details...</span> {/* Provides visually-hidden text for accessibility. */}
                </Spinner>
                <p>Loading influencer details...</p>
            </Container>
        );
// ----------------------------------------------------------------------------------------------------------------------------

// Error Handling UI.
// ----------------------------------------------------------------------------------------------------------------------------
    if (error)
        return (
            <Container className="text-center mt-5">
                <Alert variant="danger">⚠️ {error}</Alert> {/* Displays a Bootstrap Alert for errors. */}
            </Container>
        );
// ----------------------------------------------------------------------------------------------------------------------------

// Main Influencer Details UI.
    return (
        <Container className="mt-5">
          <Card className="shadow-lg"> {/* Uses a Card component to display influencer details. */}
            <Card.Body className="text-center">
              <Card.Img
                variant="top"
                src={influencer.profile_image || "https://via.placeholder.com/150"} 
                alt={influencer.name}
                className="rounded-circle mx-auto d-block"
                style={{ width: "120px", height: "120px" }}
              />
              <Card.Title className="mt-3">{influencer.name}</Card.Title> {/* Displays name, bio, and followers count with proper styling. */}
              <Card.Text className="text-muted">
                {influencer.bio || "No bio available."}
              </Card.Text>
              <Card.Text>
                <strong>👥 Followers:</strong>{" "}
                {influencer.followers ? influencer.followers.toLocaleString() : "N/A"} {/* Uses toLocaleString() for better formatting of follower numbers. */}
              </Card.Text>
            </Card.Body>
          </Card>

          <h3 className="mt-4">Recent Health-Related Claims</h3> {/* Recent Claims UI. */}
          {Array.isArray(influencer.claims) && influencer.claims.length > 0 ? (
            <ListGroup className="mt-3"> {/* Displays a list of health-related claims if available. */}
              {influencer.claims.map((claim, index) => (
                <ListGroup.Item key={index}>{claim}</ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <Alert className="mt-3" variant="info"> {/* Shows an Alert if no claims are available. */}
              No claims available.
            </Alert>
          )}
        </Container>
    );
};

export default InfluencerDetail; // Export necessary modules.
