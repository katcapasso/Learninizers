const express = require("express");
const OpenAI = require("openai");
const router = express.Router();

// Ensure API key is loaded correctly
if (!process.env.OPENAI_API_KEY) {
  console.error("Error: Missing OPENAI_API_KEY in the environment variables.");
  process.exit(1); // Stop the server if the API key is missing
}

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default, can be omitted
});

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "512x512",
    });

    res.json({ url: response.data[0].url });
  } catch (error) {
    console.error("Error generating image:", error.message);
    res.status(500).json({
      error: "Failed to generate image.",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;
