// ****************** verificationController.js *********************


const axios = require("axios"); // Importing Dependencies.

// Defining verifyClaim Function.
// ----------------------------------------------------------------------------------------------------------------------------
    const verifyClaim = async (req, res) =>
    {
        try
        {
            // Checking if claimText is Provided.
            const { claimText } = req.body;

            if (!claimText)
            {
            return res.status(400).json({ error: "Claim text is required" });
            }

            // Sending a Request to OpenAI API.
            const openAIResponse = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-4-turbo",
                    messages:
                    [
                        { role: "system", content: "You are a scientific claim verifier." },
                        { role: "user", content: `Verify this health claim: ${claimText}` },
                    ],
                },
                {
                    headers:
                    {
                        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // Sending a Request to Perplexity API.
            const perplexityResponse = await axios.post(
                "https://api.perplexity.ai/chat/completions",
                {
                    model: "llama3",
                    messages:
                    [
                        { role: "system", content: "You are an AI that verifies scientific claims." },
                        { role: "user", content: `Verify this health claim: ${claimText}` },
                    ],
                },
                {
                    headers:
                    {
                        Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // Constructing the Response.
            const verificationResult =
            {
                openAI: openAIResponse.data.choices[0].message.content,
                perplexity: perplexityResponse.data.choices[0].message.content,
            };

            res.status(200).json(verificationResult);
        }
        catch (error)
        {
            // Error Handling.
            console.error(error);
            res.status(500).json({ error: "Claim verification failed" });
        }
    };
// ----------------------------------------------------------------------------------------------------------------------------


module.exports = { verifyClaim }; // Export necessary modules.
