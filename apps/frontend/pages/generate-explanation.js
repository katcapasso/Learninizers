import { useState } from "react";

export default function GenerateExplanation() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/explain`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setResult(data.explanation || "Failed to generate explanation.");
    } catch (error) {
      console.error("Error generating explanation:", error);
      setResult("An error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold text-pink-500 mb-4">Generate Explanation</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here"
          className="mb-4 p-2 w-80 h-32 border border-gray-300 rounded"
        />
        <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
          Generate
        </button>
      </form>
      {result && (
        <div className="mt-6 p-4 bg-white shadow rounded">
          <h2 className="text-lg font-bold">Generated Explanation:</h2>
          <p className="text-gray-700">{result}</p>
        </div>
      )}
    </div>
  );
}
