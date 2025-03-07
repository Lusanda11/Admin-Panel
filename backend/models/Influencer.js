// ****************** Influencer.js *********************

const mongoose = require("mongoose"); // Importing Dependencies.

// Defining the influencerSchema.
// ----------------------------------------------------------------------------------------------------------------------------
    const influencerSchema = new mongoose.Schema(
        {
            name:
            {
                // name Field (Influencer's Full Name).
                type: String,
                required: true,
            },
            handle:
            {
                // handle Field (Unique Social Media Identifier).
                type: String,
                required: true,
                unique: true,
            },
            bio:
            {
                // bio Field (Short Description of the Influencer).
                type: String,
                default: "",
            },
            profileImage:
            {
                // profileImage Field (URL of Influencer's Profile Picture).
                type: String,
                default: "",
            },
            followerCount:
            {
                // followerCount Field (Number of Followers).
                type: Number,
                default: 0,
            },
            claims:
            [
                // claims Field (List of Claims Made by the Influencer).
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Claim",
                },
            ],
        },
        {
            // Adding Timestamps.
            timestamps: true,
        }
    );
// ----------------------------------------------------------------------------------------------------------------------------

// Creating and Exporting the Model.
const Influencer = mongoose.model("Influencer", influencerSchema);

module.exports = Influencer; // Export necessary module.
