require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import route handlers
const explain = require("./api/explain");
const extractText = require("./api/extractText");
const generateImage = require("./api/generateImage");

const app = express();

// Enable CORS for the frontend domain
app.use(cors({ origin: "https://learninizers.vercel.app" }));

// Parse incoming requests with JSON payloads
app.use(express.json());

// Define API routes
app.use("/api/explain", explain); // Route for generating explanations
app.use("/api/extract", extractText); // Route for extracting text from files
app.use("/api/generateImage", generateImage); // Route for generating images

// Default route for verifying the backend is running
app.get("/", (req, res) => {
  res.status(200).send("Backend server is running!");
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
