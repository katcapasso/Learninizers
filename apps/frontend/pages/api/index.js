export default async function handler(req, res) {
  res.status(200).json({
    message: 'Welcome to Learninizer API',
    endpoints: {
      extract: '/api/extract',
      explain: '/api/explain',
      generateImage: '/api/generateImage',
    },
  });
}
