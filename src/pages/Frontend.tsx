import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import countSkills from "../util/countSkills";
import { animateCount } from "../util/animateCount";
import processSkills from "../util/processingSkills";

async function getData() {
    const response = await fetch("/data/frontend.json");
    const data = await response.json();
    return data;
}

const Frontend = () => {
    const [jobAdsCount, setJobAdsCount] = useState(0);
    const [skillCount, setSkillCount] = useState(0);
    const [topSkills, setTopSkills] = useState<[string, number][] | null>(null);
    const [skillRanks, setSkillRanks] = useState<Record<string, number> | null>(
        null
    );
    const [skillPositions, setskillPositions] = useState<Record<
        string,
        string[]
    > | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
    const [selectedSkillCount, setSelectedSkillCount] = useState<number | null>(
        null
    );
    const [skillUp, setSkillUp] = useState<[string, number] | null>(null);
    const [skillDown, setSkillDown] = useState<[string, number] | null>(null);
    const [skillMonths, setSkillMonths] = useState<Record<
        string,
        Record<string, number>
    > | null>(null);
    const [skillGrowth, setSkillGrowth] = useState<Record<
        string,
        string
    > | null>(null);

    useEffect(() => {
        async function init() {
            const data = await getData();
            setJobAdsCount(data.length);

            const skillCount = countSkills(data);
            setSkillCount(skillCount);

            const {
                topSkills,
                skillRanks,
                skillPositions,
                skillMonths,
                skillGrowth,
            } = processSkills(data);

            setTopSkills(topSkills);
            setSkillRanks(skillRanks);
            setskillPositions(skillPositions);
            setSkillMonths(skillMonths);
            setSkillGrowth(skillGrowth);
        }

        init();
    }, []);

    useEffect(() => {
        const jobAdsCountElement = document.getElementById("jobAdsCount");
        animateCount(jobAdsCountElement, jobAdsCount, 3000, "job ads analyzed");

        const skillCountElement = document.getElementById("skillCount");
        animateCount(skillCountElement, skillCount, 3000, "skills found");
    }, [jobAdsCount, skillCount]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleCardClick = (skill: string, count: number) => {
        const skillIndex = topSkills?.findIndex(([s]) => s === skill);
        if (skillIndex !== undefined && skillIndex !== -1 && topSkills) {
            const skillUp = topSkills[skillIndex - 1] || null;
            const skillDown = topSkills[skillIndex + 1] || null;
            setSelectedSkill(skill);
            setSelectedSkillCount(count);
            setSkillUp(skillUp);
            setSkillDown(skillDown);
        }
    };

    const handleCloseModal = () => {
        setSelectedSkill(null);
        setSelectedSkillCount(null);
        setSkillUp(null);
        setSkillDown(null);
    };

    const filteredSkills = topSkills
        ? topSkills.filter(([skill]) => {
              const searchTerms = searchTerm
                  .split(" ")
                  .map((term) => term.trim().toLowerCase());

              return searchTerms.some((term) =>
                  skill.toLowerCase().includes(term)
              );
          })
        : [];

    return (
        <div className="app">
            <header className="text-center pt-40 mb-8 p-4 animation glow delay-1">
                <h2 className="text-4xl font-bold mt-10">
                    Discover the most wanted{" "}
                    <span className="text-indigo-500"> Frontend </span> skills
                </h2>
                <h2 className="text-xl mt-4 sm:p-4 p-8">
                    Browse skills required for your job position
                </h2>
            </header>
            <div className="flex flex-col sm:flex-row justify-center items-center mt-16 mb-16 animation glow delay-2">
                <div
                    id="jobAdsCount"
                    className="text-center text-2xl font-semibold sm:mr-10"
                ></div>
                <div
                    id="skillCount"
                    className="text-center text-2xl font-semibold sm:ml-10 mt-5 sm:mt-0"
                ></div>
            </div>
            <div className="text-center mb-4 animation glow delay-3">
                <input
                    type="text"
                    placeholder="React JavaScript"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border border-2 border-indigo-300 w-full max-w-sm p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
            </div>
            <div className="mx-auto text-center animation glow delay-3">
                <p className="text-xs w-full mx-auto text-gray-500">
                    Search multiple skills by separating them with a space
                </p>
            </div>
            <div className="max-w-screen-sm mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mt-10 mb-80 px-4 animation glow delay-3">
                {filteredSkills.map(([skill, count]) => (
                    <div
                        key={skill}
                        className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start cursor-pointer"
                        onClick={() => handleCardClick(skill, count)}
                    >
                        <div
                            className="text-indigo-300 text-3xl mr-10 pt-2"
                            style={{ minWidth: "32px" }}
                        >
                            {skillRanks && `#${skillRanks[skill]}`}
                        </div>
                        <div className="flex-grow">
                            <h3 className="sm:text-xl text-lg text-indigo-500">
                                {skill}
                            </h3>
                            <p className="text-black sm:text-sm text-sm mt-1">
                                {count} mentions
                            </p>
                        </div>
                        <div className="ml-10 flex flex-col items-end justify-start">
                            <p className="text-black text-sm mb-2 text-right">
                                Trending
                            </p>
                            <p className="text-sm">
                                <span className="text-black"></span>{" "}
                                <span
                                    className={
                                        skillGrowth &&
                                        skillGrowth[skill].startsWith("+")
                                            ? "text-green-500 font-bold"
                                            : "text-red-500 font-bold"
                                    }
                                >
                                    {skillGrowth ? skillGrowth[skill] : "TBA"}
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {selectedSkill && selectedSkillCount !== null && (
                <Modal
                    skill={selectedSkill}
                    count={selectedSkillCount}
                    skillRanks={skillRanks}
                    skillPositions={skillPositions}
                    skillUp={skillUp}
                    skillDown={skillDown}
                    skillMonths={skillMonths}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default Frontend;
