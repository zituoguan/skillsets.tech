import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import countSkills from "../util/countSkills";
import processSkills from "../util/processingSkills";
import { animateCount } from "../util/animateCount";

async function getData() {
    const response = await fetch("/data/frontend.json");
    const data = await response.json();
    return data;
}

const Frontend = () => {
    const navigate = useNavigate();
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
    const [skillMonths, setSkillMonths] = useState<Record<
        string,
        Record<string, number>
    > | null>(null);
    const [skillGrowth, setSkillGrowth] = useState<Record<
        string,
        string
    > | null>(null);
    const [sortByTrend, setSortByTrend] = useState<boolean>(false);

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

            navigate(`/skill/${skill}`, {
                state: {
                    skill,
                    count,
                    skillRanks,
                    skillPositions,
                    skillUp,
                    skillDown,
                    skillMonths,
                },
            });
        }
    };

    const toggleSort = () => {
        setSortByTrend((prevSortByTrend) => !prevSortByTrend);
    };

    const sortedSkills = topSkills
        ? topSkills.slice().sort((a, b) => {
              if (sortByTrend) {
                  const growthA = skillGrowth?.[a[0]] || "0%";
                  const growthB = skillGrowth?.[b[0]] || "0%";
                  const growthValueA = parseFloat(growthA.replace("%", ""));
                  const growthValueB = parseFloat(growthB.replace("%", ""));
                  return growthValueB - growthValueA;
              } else {
                  return b[1] - a[1];
              }
          })
        : [];

    const filteredSkills = sortedSkills.filter(([skill]) => {
        const searchTerms = searchTerm
            .split(" ")
            .map((term) => term.trim().toLowerCase());

        return searchTerms.some((term) => skill.toLowerCase().includes(term));
    });

    return (
        <div className="app">
            <header className="p-4 pt-40 mb-8 text-center animation glow delay-1">
                <h2 className="mt-10 text-4xl font-bold">
                    Discover the most wanted{" "}
                    <span className="text-indigo-500"> Frontend </span> skills
                </h2>
                <h2 className="p-8 mt-4 text-xl sm:p-4">
                    Browse skills required for your job position
                </h2>
            </header>
            <div className="flex flex-col items-center justify-center mt-16 mb-16 sm:flex-row animation glow delay-2">
                <div
                    id="jobAdsCount"
                    className="text-2xl font-semibold text-center sm:mr-10"
                ></div>
                <div
                    id="skillCount"
                    className="mt-5 text-2xl font-semibold text-center sm:ml-10 sm:mt-0"
                ></div>
            </div>
            <div className="px-4 mb-4 text-center sm:px-0 animation glow delay-3">
                <input
                    type="text"
                    placeholder="React JavaScript"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full max-w-sm p-3 border border-2 border-indigo-300 rounded-lg hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
            </div>
            <div className="mx-auto text-center animation glow delay-3">
                <p className="w-full mx-auto text-xs text-gray-500 px-8">
                    Search multiple skills by separating them with a space
                </p>
                <button
                    onClick={toggleSort}
                    className="mt-8 inline-flex items-center justify-center px-8 py-4 text-sm text-white bg-indigo-500 border border-2 border-indigo-500 rounded hover:bg-indigo-500 hover:shadow-lg"
                >
                    {sortByTrend ? "Sort by Count" : "Sort by Trend"}
                    <img
                        src="/assets/icons/sort.svg"
                        alt="arrow-right"
                        className="w-5 ml-2"
                    />
                </button>
            </div>
            <div className="grid max-w-screen-sm grid-cols-1 gap-4 px-4 mx-auto mt-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 mb-80 animation glow delay-3">
                {filteredSkills.map(([skill, count]) => (
                    <div
                        key={skill}
                        className="flex items-start p-6 transition-shadow duration-200 bg-gray-100 border border-transparent shadow-md cursor-pointer rounded-xl hover:shadow-lg hover:border-indigo-300"
                        onClick={() => handleCardClick(skill, count)}
                    >
                        <div
                            className="pt-2 mr-10 text-3xl text-indigo-300"
                            style={{ minWidth: "32px" }}
                        >
                            {skillRanks && `#${skillRanks[skill]}`}
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-lg text-indigo-500 sm:text-xl">
                                {skill}
                            </h3>
                            <p className="mt-1 text-sm text-black sm:text-sm">
                                {count} mentions
                            </p>
                        </div>
                        <div className="flex flex-col items-end justify-start ml-10">
                            <p className="mb-2 text-sm text-right text-black">
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
        </div>
    );
};

export default Frontend;
