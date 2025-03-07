// ****************** influencerController.js *********************


const axios = require("axios"); // Importing Dependencies.

// Caching Mechanism.
// ----------------------------------------------------------------------------------------------------------------------------
    let influencerCache = null;
    let lastFetchedTime = 0;
    const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes
// ----------------------------------------------------------------------------------------------------------------------------

// Caching Mechanism.
/* -------------------------------------------------------------------------------------------------------------------------- *\
    Purpose: Implements caching to avoid frequent API calls.
    Comment: Reduces unnecessary API requests by storing results for 15 minutes.
\* -------------------------------------------------------------------------------------------------------------------------- */



// Function to introduce delay before retrying.
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch a list of predefined health influencers from Twitter API. Uses caching to prevent excessive API requests.
// ----------------------------------------------------------------------------------------------------------------------------
    const getAllInfluencers = async (req, res) =>
    {
        // API Endpoint to Get a List of Influencers.
        const now = Date.now();

        if (influencerCache && now - lastFetchedTime < CACHE_DURATION)
        {
            console.log("🔄 Serving influencers from cache");
            return res.json(influencerCache);
        }

        try
        {
            // Fetching Data from Twitter API.
            const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

            if (!BEARER_TOKEN)
            {
                throw new Error("Missing Twitter API Bearer Token");
            }

            //Define Targeted Influencers.
            const usernames =
            [
                "dr_asha", "nutrition_facts", "DrGreger", "mindbodygreen", "drhyman"
            ];

            // Implementing API Call with Retry Logic.
            let retries = 3;
            let response;

            while (retries > 0)
            {
                try
                {
                    response = await axios.get(
                        `https://api.twitter.com/2/users/by?usernames=${usernames.join(",")}&user.fields=description,profile_image_url,public_metrics`,
                        { headers: { Authorization: `Bearer ${BEARER_TOKEN}` } }
                    );

                    // ✅ Debugging: Log rate limit headers
                    console.log("🔍 Rate Limit Remaining:", response.headers["x-rate-limit-remaining"]);
                    console.log("⏳ Rate Limit Resets At:", new Date(response.headers["x-rate-limit-reset"] * 1000));

                    if (response.status === 200) break; // Exit loop if successful
                }
                catch (error)
                {
                    // Handling Rate Limits.
                    if (error.response?.status === 429)
                    {
                        console.warn("⚠️ Rate limit reached. Retrying in 30 seconds...");
                        console.log("⏳ Waiting for rate limit reset...");
                        await delay(30000);
                        retries--;
                    }
                    else
                    {
                        throw error;
                    }
                }
            }

            // Handling Invalid Responses.
            if (!response || !response.data || !response.data.data)
            {
                throw new Error("Invalid response from Twitter API");
            }

            // Formatting API Response.
            const influencers = response.data.data.map(user => (
            {
                name: user.name,
                username: user.username,
                bio: user.description || "No bio available.",
                followers: user.public_metrics?.followers_count || 0,
                profile_image: user.profile_image_url || "https://via.placeholder.com/100"
            }));

            // Storing Data in Cache.
            influencerCache = influencers;
            lastFetchedTime = now;

            // Sending Response.
            console.log("✅ Successfully fetched health influencers from Twitter");
            res.json(influencers);
        }
        catch (error)
        {
            // Handling the error.
            console.error("❌ Error fetching influencers:", error.message);
            res.status(500).json({ error: "Failed to fetch influencers" });
        }
    };
// ----------------------------------------------------------------------------------------------------------------------------


// Fetch details of a specific influencer by username. Supports searching with or without "@" in the username.
// ----------------------------------------------------------------------------------------------------------------------------
    const searchInfluencer = async (req, res) =>
    {
        try
        {
            // API Endpoint for Searching an Influencer.
            let { username } = req.query;
            if (!username)
            {
                console.warn("⚠️ No username provided in request");
                return res.status(400).json({ error: "Username is required" });
            }

            // Remove "@" if present in the username.
            username = username.replace(/^@/, "");
            console.log(`🔍 Searching for influencer: ${username}`);

            // Sending API Request.
            const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
            if (!BEARER_TOKEN)
            {
                throw new Error("Missing Twitter API Bearer Token");
            }

            const response = await axios.get(
                `https://api.twitter.com/2/users/by/username/${username}?user.fields=description,profile_image_url,public_metrics`,
                { headers: { Authorization: `Bearer ${BEARER_TOKEN}` } }
            );

            // ✅ Debugging: Log rate limit headers
            console.log("🔍 Rate Limit Remaining:", response.headers["x-rate-limit-remaining"]);
            console.log("⏳ Rate Limit Resets At:", new Date(response.headers["x-rate-limit-reset"] * 1000));

            // Validating Response Data.
            if (!response.data || !response.data.data)
            {
                console.warn(`⚠️ Influencer ${username} not found.`);
                return res.status(404).json({ error: "Influencer not found" });
            }

            const user = response.data.data;
            const influencerDetails =
            {
                name: user.name,
                username: user.username,
                bio: user.description || "No bio available.",
                followers: user.public_metrics?.followers_count || 0,
                profile_image: user.profile_image_url || "https://via.placeholder.com/100"
            };

            console.log(`✅ Successfully fetched influencer: ${user.name}`);
            res.json(influencerDetails);
        }
        catch (error)
        {
            // Handling API Errors.
            if (error.response)
            {
                console.error(`❌ Twitter API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            }
            else
            {
                console.error("❌ Unexpected Error:", error.message);
            }
            res.status(500).json({ error: "Failed to fetch influencer" });
        }
    };
// ----------------------------------------------------------------------------------------------------------------------------


module.exports = { getAllInfluencers, searchInfluencer }; // Export necessary modules.
