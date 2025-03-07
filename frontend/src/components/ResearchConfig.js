// ****************** ResearchConfig.js *********************


// Import necessary modules.
// ----------------------------------------------------------------------------------------------------------------------------
    import React, { useState } from "react"; // Imports React and useState for managing component state.
    import { Form, Button, Container } from "react-bootstrap"; // Imports Bootstrap components (Form, Button, and Container) for UI styling.
// ----------------------------------------------------------------------------------------------------------------------------

// Defining the Functional Component.
const ResearchConfig = ({ onSubmit = () => {} }) =>
{
// Defining Component State.
// ----------------------------------------------------------------------------------------------------------------------------
    const [config, setConfig] = useState(
    {
        dateRange: "7days", // dateRange: Defaulting to "7days".
        numClaims: 10, // numClaims: Defaulting to 10.
        sources: "pubmed,consensus", // sources: Defaulting to "pubmed,consensus" (assumed to be comma-separated sources).
    });
// ----------------------------------------------------------------------------------------------------------------------------

// Handling Input Changes.
// ----------------------------------------------------------------------------------------------------------------------------
    const handleChange = (e) =>
    {
        setConfig({ ...config, [e.target.name]: e.target.value }); // Updates the config state dynamically based on user input.
        // Uses the name attribute of the input to determine which field to update.
    };
// ----------------------------------------------------------------------------------------------------------------------------

// Handling Form Submission.
// ----------------------------------------------------------------------------------------------------------------------------
    const handleSubmit = () =>
    {
        if (typeof onSubmit === "function")
        {
            onSubmit(config); // Calls onSubmit(config) if onSubmit is a function.
        }
        else
        {
            console.error("onSubmit is not a function"); // Logs an error if onSubmit is not a function.
        }
    };
// ----------------------------------------------------------------------------------------------------------------------------

// Rendering the UI.
    return (
        <Container> {/* Uses a Bootstrap Container for layout. */}
          <h2>Research Configuration</h2> {/* Displays a heading. */}
          <Form>
            <Form.Group> {/* Date Range Selection */}
              <Form.Label>Date Range</Form.Label> {/* Provides a dropdown (<select>) for selecting a date range. */}
              <Form.Control as="select" name="dateRange" onChange={handleChange} value={config.dateRange}> {/* Uses handleChange to update the state. */}

                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
              </Form.Control>
            </Form.Group>

            <Form.Group> {/* Number of Claims Input. */}
              <Form.Label>Number of Claims</Form.Label>
              <Form.Control
                type="number"
                name="numClaims"
                value={config.numClaims}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Sources</Form.Label> {/* Sources Input */}
              <Form.Control
                type="text"
                name="sources"
                value={config.sources}
                onChange={handleChange} 
              />
            </Form.Group>

            {/* Submit Button */}
            <Button className="mt-3" onClick={handleSubmit}> {/* Calls handleSubmit() when clicked. */} {/* Adds a margin (mt-3) for spacing. */}
              Save Configuration
            </Button>
          </Form>
        </Container>
    );
};

export default ResearchConfig; // Export necessary modules.
