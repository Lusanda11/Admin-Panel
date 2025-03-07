// ****************** claimApi.js *********************



// Defines an asynchronous function verifyClaim.
// ----------------------------------------------------------------------------------------------------------------------------
    export const verifyClaim = async (claim) =>
    {
        try
        {
            // API Request using fetch.
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/claims/verify`, // Uses process.env.REACT_APP_BACKEND_URL for dynamic backend URL configuration.
            {
                method: "POST",  // Uses POST to send claim data to /api/claims/verify.
                headers: { "Content-Type": "application/json" }, // Uses JSON.stringify({ content: claim }) to convert the claim into JSON format.
                body: JSON.stringify({ content: claim }), // Fix: Use "content" instead of "text"
            });

            if (!res.ok) throw new Error("Failed to verify claim"); // Checks if the response is not OK (status code >= 400).

            return res.json(); // Parses the JSON response from the API.
        }
        catch (error)
        {
            console.error("Error verifying claim:", error); // Catches any errors that occur during the API request.
            return { error: error.message }; // Returns an error object { error: error.message }, allowing the UI to display error messages to users.
        }
    };
// ----------------------------------------------------------------------------------------------------------------------------

// Defines an asynchronous function verifyClaim.
/* -------------------------------------------------------------------------------------------------------------------------- *\
    Purpose: Sends a health claim to the backend for verification.
    Parameter: Accepts claim (the text content of the claim).
    Exported: Can be imported and used in other parts of the application.
\* -------------------------------------------------------------------------------------------------------------------------- */
