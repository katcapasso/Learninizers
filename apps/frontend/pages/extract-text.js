import { useState } from "react";
import { formatText } from "@learninizer/shared";

export default function ExtractText() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleUpload = async (event) => {
    event.preventDefault();
    setError("");
    setResult("");

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/extract`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to extract text");

      const data = await response.json();
      setResult(formatText(data.text) || "No text extracted.");
    } catch (error) {
      console.error("Error extracting text:", error);
      setError("An error occurred while extracting text.");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold text-pink-500 mb-4">Extract Text</h1>
      <form onSubmit={handleUpload} className="flex flex-col items-center">
        <input
          type="file"
          accept="application/pdf,image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />
        <button
          type="submit"
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Upload & Extract
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {result && (
        <div className="mt-6 p-4 bg-white shadow rounded">
          <h2 className="text-lg font-bold">Extracted Text:</h2>
          <p className="text-gray-700">{result}</p>
        </div>
      )}
    </div>
  );
}
