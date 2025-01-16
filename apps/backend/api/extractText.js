const express = require("express");
const { processFileUpload, extractTextFromPDF } = require("../processRequest");

const router = express.Router();

router.post("/extract", async (req, res) => {
  try {
    const { filePath, fileType } = await processFileUpload(req);

    if (fileType !== "application/pdf") {
      return res.status(400).json({ error: "Invalid file type. Only PDFs are supported." });
    }

    const text = await extractTextFromPDF(filePath);
    res.status(200).json({ text });
  } catch (error) {
    console.error("Error in /extract:", error);
    res.status(500).json({ error: "Failed to process the file", details: error });
  }
});

module.exports = router;
