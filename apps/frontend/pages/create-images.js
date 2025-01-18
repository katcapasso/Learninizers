import { useState } from "react";

export default function CreateImages() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setImage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/generateImage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        }
      );

      if (!response.ok) throw new Error("Failed to generate image");

      const data = await response.json();
      setImage(data.url || "No image generated.");
    } catch (error) {
      console.error("Error generating image:", error);
      setError("An error occurred while generating the image.");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold text-pink-500 mb-4">Create Images</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a description for the image"
          className="mb-4 p-2 w-80 h-32 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Generate
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {image && (
        <div className="mt-6">
          {image.startsWith("http") ? (
            <img src={image} alt="Generated" className="rounded shadow" />
          ) : (
            <p className="text-gray-700">{image}</p>
          )}
        </div>
      )}
    </div>
  );
}
