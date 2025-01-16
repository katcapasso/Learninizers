const formidable = require("formidable");
const fs = require("fs");
const pdfParse = require("pdf-parse");

// Parse the file upload
const processFileUpload = (req) => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject({ error: "Error parsing the file", details: err });
      }

      const filePath = files.file.filepath;
      const fileType = files.file.mimetype;

      resolve({ filePath, fileType });
    });
  });
};

// Extract text from PDF
const extractTextFromPDF = (filePath) => {
  return new Promise((resolve, reject) => {
    const fileBuffer = fs.readFileSync(filePath);
    pdfParse(fileBuffer)
      .then((data) => resolve(data.text))
      .catch((error) => reject({ error: "Error extracting text from PDF", details: error }));
  });
};

module.exports = { processFileUpload, extractTextFromPDF };
