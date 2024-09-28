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
            <header className="text-center pt-40 mb-10 p-4 animation glow delay-1">
                <h2 className="text-4xl font-bold mt-10">
                    Discover the most wanted skill trends
                </h2>
                <h2 className="text-xl mt-8">
                    Browse skill trends by month and number of mentions
                </h2>
            </header>
            <div className="text-center mx-auto max-w-sm animation glow delay-2 sm:px-0 px-4">
                <form
                    onSubmit={handleSearch}
                    className="text-center inline-flex mx-auto w-full "
                >
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Python JavaScript"
                        className="border border-2 border-indigo-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 hover:border-indigo-500 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <button
                        type="submit"
                        className="ml-2 px-4 py-3 bg-indigo-500 text-white rounded-lg"
                    >
                        <img
                            src="/assets/icons/search.svg"
                            alt="search"
                            className="w-7 h-7"
                        />
                    </button>
                </form>
            </div>
            <div className="mx-auto text-center mt-4 max-w-lg animation glow delay-2 sm:px-0 px-4">
                <p className="text-xs w-full mx-auto text-gray-500">
                    Search multiple skills by separating them with a space
                </p>
            </div>
            <TrendsData skills={skills} />
        </div>
    );
};

export default Trends;
