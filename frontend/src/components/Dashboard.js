// ****************** Dashboard.js *********************


// Import necessarry modules.
// ----------------------------------------------------------------------------------------------------------------------------
    import React, { useEffect, useState } from "react"; // Good use of React hooks (useEffect, useState) for handling state and lifecycle events.
    import { getInfluencers } from "../api/influencerApi"; // Imports getInfluencers from the API module correctly.
    import { Link } from "react-router-dom"; // Uses react-router-dom for navigation, ensuring influencers' details are accessible via Link.
    import { Table, Container, Alert, Spinner } from "react-bootstrap"; // react-bootstrap components (Table, Container, Alert, Spinner) are well-chosen for a clean UI.
// ----------------------------------------------------------------------------------------------------------------------------


const Dashboard = () =>
{
// State Management.
// ----------------------------------------------------------------------------------------------------------------------------
    const [influencers, setInfluencers] = useState([]); // Initializes influencers as an empty array, ensuring the component can handle cases where no influencers exist.
    const [loading, setLoading] = useState(true); // loading is set to true initially to display a loading spinner while data is being fetched.
    const [error, setError] = useState(null); // error is initialized as null, allowing dynamic error handling.
// ----------------------------------------------------------------------------------------------------------------------------


// Fetching Influencers.
// ----------------------------------------------------------------------------------------------------------------------------
    useEffect(() =>
    {
        async function fetchData()
        {
            try
            {
                const data = await getInfluencers();
                if (!Array.isArray(data)) throw new Error("Invalid API response");
                setInfluencers(data);
            }
            catch (err)
            {
                setError(err.message || "Failed to load influencers.");
            }
            finally
            {
                setLoading(false);
            }
        }
        fetchData();
    }, []);
// ----------------------------------------------------------------------------------------------------------------------------

// Fetching Influencers.
/* -------------------------------------------------------------------------------------------------------------------------- *\
    Good use of useEffect to fetch data on component mount.
    Uses an async function inside useEffect (since useEffect itself cannot be async).
    Validates API response before updating state (ensures data is an array).
    Error handling is well-implemented, catching errors and updating the error state.
    Ensures loading is set to false in the finally block, avoiding infinite loading states.
\* -------------------------------------------------------------------------------------------------------------------------- */

// Main Component Return Block.
    return (
        <Container> {/* Uses Container for Bootstrap styling and responsiveness. */}
          <h2 className="my-4 text-center">Influencer Leaderboard</h2>

          {loading && (
            <div className="text-center"> {/* Title is centered and styled (my-4 text-center is a good choice). */}
              <Spinner animation="border" role="status"> {/* Displays a spinner when loading is true. */}
                <span className="visually-hidden">Loading...</span> {/* Accessibility-friendly (visually-hidden ensures screen readers can interpret it). */}
              </Spinner> {/* Good UX—spinner is centered for a polished UI. */}
            </div>
          )}

          {error && <Alert variant="danger">{error}</Alert>} {/* Shows an error message when API call fails. */}
          {!loading && !error && influencers.length === 0 && (
            <Alert variant="warning">No influencers found.</Alert>
        )} {/* Ensures users receive feedback if no influencers exist. */}

          {!loading && influencers.length > 0 && (
            <Table striped bordered hover>  {/* Uses Bootstrap table with striped, bordered, and hover styles—good for readability. */}
              <thead>  {/* Headers (<th>) are well-defined for key influencer attributes. */}
                <tr>
                  <th>Name</th>
                  <th>Trust Score</th>
                  <th>Followers</th>
                  <th>Claims Verified</th>
                </tr>
              </thead>
              <tbody>
                {influencers.map((influencer) => (
                  <tr key={influencer._id || influencer.name}> {/* Dynamically renders influencer data using .map(). */}
                    <td>
                      <Link to={`/influencer/${influencer._id || "#"}`}> {/* Wraps influencer names in a Link, making names clickable to navigate to details. */}
                        {influencer.name || "Unknown"}
                      </Link>
                    </td>
                    <td>{influencer.trustScore ?? "N/A"}</td>   {/* Uses ?? "N/A" for fallback values, preventing crashes when data is missing. */}
                    <td>{influencer.followers ?? "N/A"}</td>
                    <td>{influencer.claims?.length ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Container>
    );
};

export default Dashboard; // Export necessary modules.
