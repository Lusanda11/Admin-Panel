// ****************** claimController.js *********************

const axios = require("axios"); // Importing axios for making HTTP requests.


// Extract health claims from text using OpenAI API.
// ----------------------------------------------------------------------------------------------------------------------------
    const extractHealthClaims = async (req, res) =>
    {
        // Extract the 'content' field from the request body.
        const { content } = req.body;

        // Log the received content for debugging.
        console.log("🔍 Received Content for Extraction:", content);

        // Validate the input: Ensure content is provided and not just empty spaces.
        if (!content || content.trim() === "")
        {
            return res.status(400).json({ error: "No text provided for claim extraction." });
        }

        try
        {
            // Send request to OpenAI API for claim extraction.
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions", // OpenAI API endpoint for chat-based models.
                {
                    model: "gpt-4", // Specifies the AI model to use.
                    messages:
                    [
                        {
                            role: "system", // System role to guide the AI's behavior.
                            content: "You are an expert in analyzing health-related claims. Identify, extract, and list only concrete health claims found in the input text. If no direct claims are found, infer likely claims based on context."
                        },
                        {
                            role: "user", // User input with the provided content.
                            content: `Extract all health-related claims from this text: "${content}". If no direct claims are found, infer possible claims that might be associated with the given context.`
                        }
                    ],
                    temperature: 0.7 // Controls randomness of responses (lower values make responses more deterministic).
                },
                {
                    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } // Authorization header with API key.
                }
            );

            // Extracted claims from response.
            const extractedClaims = response.data.choices[0]?.message?.content || "No claims found.";

            // Log the extracted claims for debugging.
            console.log("✅ Extracted Claims:", extractedClaims);

            // Send the extracted claims as a JSON response.
            res.json({ claims: extractedClaims });

        }
        catch (error)
        {
            // Handle errors: Log the error message and send a failure response.
            console.error("❌ Error extracting claims:", error.response?.data || error.message);
            res.status(500).json({ error: "Failed to extract health claims. Please try again." });
        }
    };
// ----------------------------------------------------------------------------------------------------------------------------


module.exports = { extractHealthClaims }; // Export the extractHealthClaims function for use in routes.
