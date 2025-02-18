import Link from "next/link";

export default function Footer() {
  return (
    <footer className="max-w-screen-lg mx-auto py-5 bg-[rgba(11,11,11,0.8)] backdrop-blur-lg rounded-t animation glow delay-2">
      <div className="flex justify-around items-center text-white text-sm max-w-screen-md mx-auto">
        <Link
          href="/about"
          className="flex items-center space-x-2 hover:underline"
        >
          <span></span>
          <span>About</span>
        </Link>
        <Link
          href="/contribute"
          className="flex items-center space-x-2 hover:underline"
        >
          <span></span>
          <span>Contribute</span>
        </Link>
        <a
          href="https://github.com/stefanicjuraj/skillsets"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:underline"
        >
          <span></span>
          <span>GitHub</span>
        </a>
        <a
          href="https://www.linkedin.com/in/jurajstefanic/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:underline"
        >
          <span></span>
          <span>LinkedIn</span>
        </a>
      </div>
    </footer>
  );
}
