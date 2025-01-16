export default async function handler(req, res) {
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/explain`;
  
    if (req.method === "POST") {
      try {
        // Forward the request to the backend
        const response = await fetch(backendUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          return res.status(response.status).json(errorData);
        }
  
        const data = await response.json();
        res.status(200).json(data);
      } catch (error) {
        console.error("Error forwarding explain request:", error);
        res.status(500).json({ error: "Failed to process the request." });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  