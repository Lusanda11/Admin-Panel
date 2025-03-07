// ****************** influencerRoutes.js *********************


// Import necessary modules.
// ----------------------------------------------------------------------------------------------------------------------------
    const express = require("express");
    const { getAllInfluencers, searchInfluencer } = require("../controllers/influencerController.js");

    const router = express.Router();
// ----------------------------------------------------------------------------------------------------------------------------



// Get all predefined health influencers.
// ----------------------------------------------------------------------------------------------------------------------------
    router.get("/", async (req, res) =>
        {
            try
            {
                await getAllInfluencers(req, res);
            }
            catch (error)
            {
                console.error("❌ Error fetching influencers:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
    );
// ----------------------------------------------------------------------------------------------------------------------------



// Search for a specific influencer.
// ----------------------------------------------------------------------------------------------------------------------------
    router.get("/search", async (req, res) =>
        {
            try
            {
                await searchInfluencer(req, res);
            }
            catch (error)
            {
                console.error("❌ Error searching influencer:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
    );
// ----------------------------------------------------------------------------------------------------------------------------


module.exports = router; // Export necessary modules. 
