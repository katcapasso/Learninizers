export default function handler(req, res) {
  res.status(200).json({
    message: "Welcome to the Learninizers API",
    endpoints: {
      extract: "/api/extract",
      explain: "/api/explain",
      generateImage: "/api/generateImage",
    },
  });
}
