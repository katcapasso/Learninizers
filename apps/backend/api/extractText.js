const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const router = express.Router();

// Configure multer for file upload
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// Route to handle text extraction from uploaded files
router.post("/", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  try {
    // Parse the uploaded file to extract text
    const data = await pdfParse(req.file.buffer);

    // Respond with the extracted text
    res.status(200).json({ text: data.text });
  } catch (error) {
    console.error("Error extracting text from file:", error.message);

    // Return a 500 status with a detailed error message
    res.status(500).json({
      error: "Failed to extract text from file.",
      details: error.message,
    });
  }
});

module.exports = router;
