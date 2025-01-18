require("dotenv").config();
const express = require("express");
const cors = require("cors");

const explain = require("./api/explain");
const extractText = require("./api/extractText"); // Ensure this file exists and is properly implemented
const generateImage = require("./api/generateImage"); // Ensure this file exists and is properly implemented

const app = express();

// Enable CORS
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Routes
app.post("/api/explain", explain); // Route for explanation
app.post("/api/extract", extractText); // Route for text extraction
app.post("/api/generateImage", generateImage); // Route for image generation

// Default route to verify the backend is running
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
