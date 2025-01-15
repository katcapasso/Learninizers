const { extractTextFromPDF, extractTextFromImage } = require('./extractText');

module.exports.handleTextExtraction = async (req, res) => {
  const { type } = req.params;

  if (!req.file) {
    return res.status(400).json({ error: 'No file provided.' });
  }

  try {
    let extractedText;
    if (type === 'pdf') {
      extractedText = await extractTextFromPDF(req.file.buffer);
    } else if (type === 'image') {
      extractedText = await extractTextFromImage(req.file.path);
    } else {
      return res.status(400).json({ error: 'Invalid file type.' });
    }

    res.status(200).json({ text: extractedText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
