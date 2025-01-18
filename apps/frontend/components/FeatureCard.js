import { formatText } from "@learninizer/shared";

export default function FeatureCard({ title, description, link }) {
  const formattedTitle = formatText(title);
  const formattedDescription = formatText(description);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
      <h2 className="text-2xl font-bold text-pink-500 mb-4">{formattedTitle}</h2>
      <p className="text-gray-700 mb-6">{formattedDescription}</p>
      <a
        href={link}
        className="text-white bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-lg"
      >
        Try Now
      </a>
    </div>
  );
}
