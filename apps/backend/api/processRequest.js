const formidable = require("formidable");
const fs = require("fs");
const pdfParse = require("pdf-parse");

// Parse the file upload
const processFileUpload = (req) => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Error parsing the file:", err);
        return reject({ error: "Error parsing the file.", details: err });
      }

      if (!files.file) {
        console.error("No file uploaded.");
        return reject({ error: "No file uploaded." });
      }

      const filePath = files.file.filepath || files.file.path;
      const fileType = files.file.mimetype;

      if (!filePath || !fileType) {
        console.error("Invalid file or file type.");
        return reject({ error: "Invalid file or file type." });
      }

      resolve({ filePath, fileType });
    });
  });
};

// Extract text from PDF
const extractTextFromPDF = (filePath) => {
  return new Promise((resolve, reject) => {
    try {
      const fileBuffer = fs.readFileSync(filePath);
      pdfParse(fileBuffer)
        .then((data) => resolve(data.text))
        .catch((error) => {
          console.error("Error extracting text from PDF:", error.message);
          reject({ error: "Error extracting text from PDF.", details: error });
        });
    } catch (error) {
      console.error("Error reading file:", error.message);
      reject({ error: "Error reading file.", details: error });
    }
  });
};

// Clean up uploaded file
const cleanupFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("Temporary file deleted:", filePath);
    }
  } catch (error) {
    console.error("Error deleting file:", error.message);
  }
};

module.exports = { processFileUpload, extractTextFromPDF, cleanupFile };
