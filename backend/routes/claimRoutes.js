// ****************** claimRoutes.js *********************

const express = require("express"); // Importing Dependencies
const { extractHealthClaims } = require("../controllers/claimController"); // Importing Controller Function.

const router = express.Router(); // Creating an Express Router.

router.post("/verify", extractHealthClaims); // Defining the POST Route for Claim Verification.

module.exports = router; // Export necessary modules.
