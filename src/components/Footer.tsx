import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="mx-auto w-full p-4 bg-[#333] animation glow delay-3">
            <div className="text-white flex items-center max-w-xl mx-auto justify-between p-4 text-sm text-gray-500">
                <Link to="/about">
                    <a className="hover:underline">About</a>
                </Link>
                <p>© SkillSets</p>
                <a
                    href="https://github.com/stefanicjuraj/skillsets"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                >
                    Contribute
                </a>
            </div>
        </footer>
    );
}
