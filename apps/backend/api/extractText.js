const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const router = express.Router();

// Configure multer for file upload
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

router.post("/", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  try {
    const data = await pdfParse(req.file.buffer);
    res.status(200).json({ text: data.text });
  } catch (error) {
    console.error("Error extracting text from file:", error.message);
    res.status(500).json({
      error: "Failed to extract text from file.",
      details: error.message,
    });
  }
});

module.exports = router;
