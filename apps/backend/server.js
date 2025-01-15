const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const tesseract = require('tesseract.js');
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());

// Extract text from PDF
app.post('/api/extract/pdf', upload.single('file'), async (req, res) => {
  try {
    const data = await pdfParse(req.file.buffer);
    res.json({ text: data.text });
  } catch (err) {
    res.status(500).send('Error extracting text from PDF.');
  }
});

// Extract text from Image
app.post('/api/extract/image', upload.single('file'), async (req, res) => {
  try {
    const text = await tesseract.recognize(req.file.path, 'eng');
    res.json({ text: text.data.text });
  } catch (err) {
    res.status(500).send('Error extracting text from image.');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
