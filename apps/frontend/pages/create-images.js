import { useState } from "react";

export default function CreateImages() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/generateImage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setImage(data.url || "Failed to generate image.");
    } catch (error) {
      console.error("Error generating image:", error);
      setImage("An error occurred.");
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
        />
        <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
          Generate
        </button>
      </form>
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
