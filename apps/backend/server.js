require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import API routes
const explain = require("./api/explain");
const extractText = require("./api/extractText");
const generateImage = require("./api/generateImage");

const app = express();

// Enable CORS
app.use(cors({ origin: "https://learninizers.vercel.app" }));

// Parse incoming JSON requests
app.use(express.json());

// Define API routes
app.use("/api/explain", explain);
app.use("/api/extract", extractText);
app.use("/api/generateImage", generateImage);

// Default route
app.get("/", (req, res) => {
  res.status(200).send("Backend server is running!");
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
