import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Disables Next.js body parsing to handle file uploads
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const form = new formidable.IncomingForm();

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Error parsing form data:", err);
          return res.status(500).json({ error: "Failed to process file upload." });
        }

        const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/extract`;

        const formData = new FormData();
        formData.append("file", fs.createReadStream(files.file.filepath));

        try {
          const response = await fetch(backendUrl, {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            const error = await response.json();
            return res.status(response.status).json(error);
          }

          const data = await response.json();
          res.status(200).json(data);
        } catch (error) {
          console.error("Error forwarding file to backend:", error);
          res.status(500).json({ error: "Failed to communicate with the backend." });
        }
      });
    } catch (error) {
      console.error("Error processing extract API request:", error);
      res.status(500).json({ error: "Failed to process the request." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
