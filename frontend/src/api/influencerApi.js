// ****************** influencerApi.js *********************




import axios from "axios"; // Imports axios for making HTTP requests to the backend API.

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"; // Defines the base URL for API requests.


// Fetch all influencers.
// ----------------------------------------------------------------------------------------------------------------------------
    export const getInfluencers = async () =>
    {
        try
        {
            const res = await axios.get(`${API_BASE_URL}/api/influencers`);
            return Array.isArray(res.data) ? res.data : [];
        }
        catch (error)
        {
            console.error("❌ Error fetching influencers:", error);
            return [];
        }
    };
// ----------------------------------------------------------------------------------------------------------------------------

// Fetch all influencers.
/* -------------------------------------------------------------------------------------------------------------------------- *\
    Purpose: Fetches all influencers from the API.
    Steps:
    Sends a GET request to /api/influencers.
    Checks if the response contains an array (Array.isArray(res.data)).
    If the response is not an array, returns an empty array ([]) to prevent errors.
    Error Handling:
    Logs errors to the console (console.error).
    Returns an empty array ([]) instead of null or undefined to avoid breaking UI components that map over influencers.
\* -------------------------------------------------------------------------------------------------------------------------- */


// Fetch a single influencer's details (by username).
// ----------------------------------------------------------------------------------------------------------------------------
    export const searchInfluencer = async (username) =>
    {
        try
        {
            if (!username) throw new Error("Username is required");

            // Remove @ if present
            const formattedUsername = username.replace(/^@/, "");

            const res = await axios.get(
                `${API_BASE_URL}/api/influencers/search?username=${formattedUsername}`
            );

            return res.data || null;
        }
        catch (error)
        {
            console.error(`❌ Error fetching influencer (${username}):`, error);
            return null;
        }
    };
// ----------------------------------------------------------------------------------------------------------------------------

// Fetch a single influencer's details (by username).
/* -------------------------------------------------------------------------------------------------------------------------- *\
    Purpose: Fetches an influencer’s details using their username.
    Steps:
    Input Validation: Throws an error if username is missing.
    Preprocessing: Removes the @ symbol from usernames if present (useful for social media usernames).
    API Request: Sends a GET request to /api/influencers/search, passing the username as a query parameter.
    Response Handling: Returns the response data if available, otherwise returns null.
    Error Handling:
    Logs the error to the console.
    Returns null instead of throwing an error to avoid breaking the UI.
\* -------------------------------------------------------------------------------------------------------------------------- */
