export default async function handler(req, res) {
  const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/generateImage`;

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Backend error:", error);
      return res.status(response.status).json(error);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error forwarding request to backend:", error.message);
    res.status(500).json({ error: "Failed to process the request." });
  }
}
