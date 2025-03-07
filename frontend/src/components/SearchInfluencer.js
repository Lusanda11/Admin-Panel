// ****************** SearchInfluencer.js *********************


// Import necessary modules.
// ----------------------------------------------------------------------------------------------------------------------------
    import React, { useState } from "react"; // Imports necessary React and Bootstrap components.
    import { Container, Form, Button, Card, Spinner, Alert } from "react-bootstrap";
    import { searchInfluencer } from "../api/influencerApi"; // Imports the searchInfluencer function from an API module (influencerApi), which is assumed to handle API calls.
// ----------------------------------------------------------------------------------------------------------------------------

// Defining the Functional Component.
const SearchInfluencer = () =>
{
// Defining Component State.
// ----------------------------------------------------------------------------------------------------------------------------
    const [username, setUsername] = useState(""); // username: Stores the user's input (Twitter username).
    const [influencer, setInfluencer] = useState(null); // influencer: Holds the influencer data retrieved from the API.
    const [loading, setLoading] = useState(false); // loading: Boolean flag to manage the loading state.
    const [error, setError] = useState(null); // error: Stores any error messages.
// ----------------------------------------------------------------------------------------------------------------------------


// Handling Search Logic.
// ----------------------------------------------------------------------------------------------------------------------------
    const handleSearch = async () =>
    {
        if (!username.trim())
        {
            // Prevents searching with an empty input.
            setError("Please enter a Twitter username.");
            return;
        }

        setLoading(true);
        setError(null); // Clears any previous errors.

        const data = await searchInfluencer(username); // Calls searchInfluencer(username) to fetch data.

        // Updates influencer state if data is found, otherwise sets an error message.
        if (data)
        {
            setInfluencer(data);
        }
        else
        {
            setError("Influencer not found or API limit exceeded.");
        }

        setLoading(false); // Toggles loading state before and after the API call.
    };
// ----------------------------------------------------------------------------------------------------------------------------

// Rendering the UI.
    return (
        <Container className="mt-5"> {/* Uses Bootstrap's Container for layout. */}
          <h2 className="text-center">Search for a Health Influencer</h2> {/* Displays a heading. */}

          <Form className="d-flex justify-content-center my-4"> {/* Search Input Form. */}
            <Form.Control
              type="text"
              placeholder="Enter Twitter username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ maxWidth: "400px" }}
            />
            <Button variant="primary" className="ms-2" onClick={handleSearch}> {/* Adds a "Search" button to trigger handleSearch(). */}
              Search
            </Button>
          </Form>

          {/* Displaying Loading Indicator. */}
          {loading && (
            <div className="text-center">
              <Spinner animation="border" /> {/* Shows a spinner and loading message while data is being fetched. */}
              <p>Fetching influencer details...</p>
            </div>
          )}

          {/* Displaying Error Messages. */}
          {error && <Alert variant="danger">{error}</Alert>} {/* Displays an error message if error is set. */}

          {/* Displaying Influencer Details. */}
          {influencer && (
            <Card className="shadow-lg mt-3 text-center"> {/* Displays influencer details in a Bootstrap Card. */}
              <Card.Body>
                <Card.Img
                  variant="top"
                  src={influencer.profile_image || "https://via.placeholder.com/150"} 
                  alt={influencer.name}
                  className="rounded-circle mx-auto d-block"
                  style={{ width: "120px", height: "120px" }}
                />
                <Card.Title className="mt-3">{influencer.name}</Card.Title>
                <Card.Text className="text-muted">
                  @{influencer.username} | {influencer.bio || "No bio available"} {/* Displays username, bio (or default text), and formatted follower count. */}
                </Card.Text>
                <Card.Text>
                  <strong>Followers:</strong> {influencer.followers.toLocaleString()}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Container>
    );
};

export default SearchInfluencer; // Export necessary modules.
