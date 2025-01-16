require("dotenv").config();
const express = require("express");
const cors = require("cors");

const extractRoutes = require("./api/extractText");
const explainRoutes = require("./api/explain");
const generateImageRoutes = require("./api/generateImage");

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", extractRoutes);
app.use("/api", explainRoutes);
app.use("/api", generateImageRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Learninizer Backend API!");
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
