import { formatText } from "@learninizer/shared";

export default function Footer() {
  const footerText = "Made with ❤️ by Katherine Capasso";
  const formattedFooterText = formatText(footerText);

  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 Learninizer. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-2">{formattedFooterText}</p>
      </div>
    </footer>
  );
}
