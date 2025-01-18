import FeatureCard from "../components/FeatureCard";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-pink-50">
      {/* Header Section */}
      <header className="bg-pink-500 text-white p-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">Learninizers</h1>
      </header>

      {/* Main Section */}
      <main className="flex flex-col items-center py-8">
        <h1 className="text-5xl font-bold text-pink-500 mb-6">Welcome to Learninizers!</h1>
        <p className="text-lg text-gray-700 max-w-2xl mb-6 text-center">
          The all-in-one platform for extracting text, generating explanations, and creating images
          powered by AI.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <FeatureCard
            title="Extract Text"
            description="Upload PDFs or images and extract text with ease."
            link="/extract-text"
          />
          <FeatureCard
            title="Generate Explanation"
            description="Get detailed explanations for your text using AI."
            link="/generate-explanation"
          />
          <FeatureCard
            title="Create Images"
            description="Turn your imagination into reality with AI-generated images."
            link="/create-images"
          />
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2025 Learninizers. All rights reserved.</p>
        <p className="text-sm">Made with ❤️ by Katherine Capasso</p>
      </footer>
    </div>
  );
}
