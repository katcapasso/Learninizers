import { formatText } from "@learninizer/shared";

export default async function handler(req, res) {
  const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/explain`;

  if (req.method === "POST") {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required." });
      }

      // Sanitize input
      const sanitizedPrompt = formatText(prompt);

      // Forward the request to the backend
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: sanitizedPrompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json(errorData);
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error forwarding explain request:", error.message);
      res.status(500).json({ error: "Failed to process the request." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
