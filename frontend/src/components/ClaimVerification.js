// ****************** ClaimVerification.js *********************


// Import necessary modules.
// ----------------------------------------------------------------------------------------------------------------------------
    import React, { useState } from "react"; // Imports React and useState for component state management.
    import { verifyClaim } from "../api/claimApi"; // Imports verifyClaim from claimApi.js, which likely contains an API call to verify a claim.
    import { Form, Button, Container, Alert } from "react-bootstrap"; // Imports Bootstrap components (Form, Button, Container, Alert) for UI styling.
// ----------------------------------------------------------------------------------------------------------------------------

// Declares a functional component named ClaimVerification.
const ClaimVerification = () =>
{
// State Variables.
// ----------------------------------------------------------------------------------------------------------------------------
    const [claim, setClaim] = useState(""); // claim: Stores the user input for a claim.
    const [result, setResult] = useState(null); // result: Stores the verification result returned by the API.
    const [error, setError] = useState(null); // Stores any error message if the API call fails.
// ----------------------------------------------------------------------------------------------------------------------------


// Form Submission Handler.
// ----------------------------------------------------------------------------------------------------------------------------
    const handleSubmit = async (e) =>
    {
        e.preventDefault(); // Prevents the default form submission behavior (e.preventDefault()).
        setError(null); // Resets error state before making an API call.

        const data = await verifyClaim(claim); // Calls verifyClaim(claim) to fetch verification data from the API.
        if (data.error)
        {
            setError(data.error); // If the API response contains an error, it updates error.
        }
        else
        {
            setResult(data); // Otherwise, it stores the API response in result.
        }
    };
// ----------------------------------------------------------------------------------------------------------------------------

// Component Return (UI).
    return (
        <Container>
          <h2>Verify a Health Claim</h2>
          <Form onSubmit={handleSubmit}> {/* Displays a form where users can input a health claim. */}
            <Form.Group> {/* Uses Bootstrap’s Form.Group for structured input fields. */}
              <Form.Label>Enter Claim</Form.Label>
              <Form.Control
                type="text"
                value={claim}
                onChange={(e) => setClaim(e.target.value)} 
              />
            </Form.Group>
            <Button type="submit" className="mt-3">Verify</Button> {/* Submits the form using the handleSubmit function. */}
          </Form>

          {error && <Alert variant="danger" className="mt-4">{error}</Alert>} {/* Displays an error alert if error state is set. */}

          {result && (
            <div className="mt-4"> {/* Displays the verification result if result is available. */}
              <h4>Result:</h4> {/* Uses <h4> and <p> tags to present the verified claims. */}
              <p><strong>Claims:</strong> {result.claims}</p> {/* result.claims is assumed to be an array or string representing verified claims. */}
            </div>
          )}
        </Container>
    );
};

export default ClaimVerification; // Export necessary modules.
