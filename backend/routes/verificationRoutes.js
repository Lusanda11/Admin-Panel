// ****************** verificationRoutes.js *********************

const express = require("express"); // Importing Express.
const { verifyClaim } = require("../controllers/verificationController"); // Importing the verifyClaim Controller Function.

const router = express.Router(); // Creating an Express Router.

router.post("/verify", verifyClaim); // Defining the POST Route for Verification.

module.exports = router; // xport necessary modules.
