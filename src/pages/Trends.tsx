import { useState } from "react";
import TrendsData from "../components/TrendsData";

const Trends = () => {
    const [skills, setSkills] = useState<string[] | null>(null);
    const [inputValue, setInputValue] = useState<string>("");

    const allowedCharacters = /^[a-zA-Z0-9. ]*$/;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            const skillArray = inputValue
                .trim()
                .split(/\s+/)
                .map((skill) => skill.toLowerCase());
            setSkills(skillArray);
        } else {
            setSkills(null);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (allowedCharacters.test(value)) {
            setInputValue(value);
        }
    };

    return (
        <div>
            <header className="p-4 pt-40 mb-10 text-center animation glow delay-1">
                <h2 className="mt-10 text-4xl font-bold">
                    Discover the most wanted skill trends
                </h2>
                <h2 className="mt-8 text-xl">
                    Browse skill trends by month and number of mentions
                </h2>
            </header>
            <div className="max-w-sm px-4 mx-auto text-center animation glow delay-2 sm:px-0">
                <form
                    onSubmit={handleSearch}
                    className="inline-flex w-full mx-auto text-center "
                >
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Python JavaScript"
                        className="w-full p-3 border border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 hover:border-indigo-500 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <button
                        type="submit"
                        className="px-4 py-3 ml-2 text-white bg-indigo-500 rounded-lg"
                    >
                        <img
                            src="/assets/icons/search.svg"
                            alt="search"
                            className="w-7 h-7"
                        />
                    </button>
                </form>
            </div>
            <div className="max-w-lg px-4 mx-auto mt-4 text-center animation glow delay-2 sm:px-0">
                <p className="w-full mx-auto text-xs text-gray-500">
                    Search multiple skills by separating them with a space
                </p>
            </div>
            <TrendsData skills={skills} />
        </div>
    );
};

export default Trends;
