// ****************** Claim.js *********************

const mongoose = require("mongoose"); // Importing Dependencies.

// Defining the claimSchema.
// ----------------------------------------------------------------------------------------------------------------------------
    const claimSchema = new mongoose.Schema(
        {
            claimText:
            {
                // claimText Field (Main Claim Content).
                type: String,
                required: true,
            },
            category:
            {
                // category Field (Claim Classification).
                type: String,
                enum: ["Nutrition", "Medicine", "Mental Health", "Other"],
                default: "Other",
            },
            verificationStatus:
            {
                // verificationStatus Field (Claim Assessment).
                type: String,
                enum: ["Verified", "Questionable", "Debunked"],
                default: "Questionable",
            },
            trustScore:
            {
                // trustScore Field (Reliability Score).
                type: Number,
                default: 0, // Can range from 0 (low trust) to 100 (high trust).
            },
            dateClaimed:
            {
                // dateClaimed Field (Timestamp for When Claim Was Made).
                type: Date,
                default: Date.now,
            },
            influencer:
            {
                // influencer Field (Reference to Influencer).
                type: mongoose.Schema.Types.ObjectId,
                ref: "Influencer",
                required: true,
            },
        },
        {
            // Adding Timestamps.
            timestamps: true,
        }
    );
// ----------------------------------------------------------------------------------------------------------------------------

// Creating and Exporting the Model.
const Claim = mongoose.model("Claim", claimSchema);

module.exports = Claim; // Expoert necessary modules.
