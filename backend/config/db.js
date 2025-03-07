// ****************** db.js *********************

const mongoose = require("mongoose"); // Importing the mongoose library to interact with MongoDB.

// Defining an asynchronous function to connect to the MongoDB database.
// ----------------------------------------------------------------------------------------------------------------------------
    const connectDB = async () =>
    {
        try
        {
            // Attempt to connect to the MongoDB database using the provided connection string from environment variables.
            const conn = await mongoose.connect(process.env.MONGO_URI,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                }
            );

            // If the connection is successful, log the connected host.
            console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        }
        catch (error)
        {
            // If an error occurs during the connection, log the error message and exit the process with a failure status.
            console.error(`❌ MongoDB Connection Error: ${error.message}`);
            process.exit(1); // Exiting with a non-zero status indicates an error.
        }
    };
// ----------------------------------------------------------------------------------------------------------------------------


module.exports = connectDB; // Exporting the connectDB function so it can be used in other parts of the application.
