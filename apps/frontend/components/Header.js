import { formatText } from "@learninizer/shared";

export default function Header() {
  const siteName = "Learninizer";
  const formattedSiteName = formatText(siteName);

  return (
    <header className="bg-pink-500 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">{formattedSiteName}</h1>
        <nav className="space-x-6">
          <a href="/" className="hover:underline">
            Home
          </a>
          <a href="/about" className="hover:underline">
            About
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
