export default function Home() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50">
        <h1 className="text-4xl font-bold text-pink-400">
          Welcome to Learninizer!
        </h1>
        <p className="text-lg text-gray-700 mt-4">
          Explore the API endpoints:
        </p>
        <ul className="mt-2">
          <li className="text-blue-500">
            <a href="/api/extract">/api/extract</a>
          </li>
          <li className="text-blue-500">
            <a href="/api/explain">/api/explain</a>
          </li>
          <li className="text-blue-500">
            <a href="/api/generateImage">/api/generateImage</a>
          </li>
        </ul>
      </div>
    );
  }
  