const pdfParse = require('pdf-parse');
const tesseract = require('tesseract.js');

module.exports.extractTextFromPDF = async (fileBuffer) => {
  try {
    const data = await pdfParse(fileBuffer);
    return data.text;
  } catch (error) {
    throw new Error('Failed to extract text from PDF.');
  }
};

module.exports.extractTextFromImage = async (filePath) => {
  try {
    const text = await tesseract.recognize(filePath, 'eng');
    return text.data.text;
  } catch (error) {
    throw new Error('Failed to extract text from image.');
  }
};
