const OpenAI = require("openai");

// Ensure API key is loaded correctly
if (!process.env.OPENAI_API_KEY) {
  console.error("Error: Missing OPENAI_API_KEY in the environment variables.");
  process.exit(1); // Exit if API key is not configured
}

// Configure OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use the API key from environment variables
});

// Define the API route
module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.setHeader("Allow", ["POST"]).status(405).end("Method Not Allowed");
    }

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Generate the explanation
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt,
      max_tokens: 100,
    });

    res.status(200).json({ choices: completion.choices });
  } catch (error) {
    console.error("Error in /api/explain:", error.message);
    res.status(500).json({ error: "Failed to generate explanation." });
  }
};
