import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import countSkills from "../util/countSkills";
import processSkills from "../util/processSkills";
import processingSkills from "../util/processingSkills";
import { animateCount } from "../util/animateCount";
import Modal from "../components/ModalAll";

async function getData() {
    const response = await fetch("/data/all.json");
    const data = await response.json();
    return data;
}

const Home = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [chartOptions, setChartOptions] = useState<any>(null);
    const [chartSeries, setChartSeries] = useState<
        { name: string; data: number[] }[] | null
    >(null);
    const [jobAdsCount, setJobAdsCount] = useState(0);
    const [skillCount, setSkillCount] = useState(0);
    const [showChart, setShowChart] = useState(true);
    const [topSkills, setTopSkills] = useState<[string, number][] | null>(null);
    const [skillRanks, setSkillRanks] = useState<Record<string, number> | null>(
        null
    );
    const [skillPositions, setskillPositions] = useState<Record<
        string,
        string[]
    > | null>(null);
    const [skillGrowth, setSkillGrowth] = useState<Record<
        string,
        string
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

    useEffect(() => {
        async function init() {
            const data = await getData();
            setJobAdsCount(data.length);

            const skillCount = countSkills(data);
            setSkillCount(skillCount);

            const techData = processSkills(data);

            setChartOptions({
                chart: {
                    type: "bar",
                    toolbar: { show: true },
                    animations: {
                        enabled: true,
                        easing: "easeinout",
                        speed: 2000,
                        animateGradually: { enabled: true, delay: 200 },
                        dynamicAnimation: { enabled: true, speed: 1000 },
                    },
                },
                xaxis: {
                    categories: Object.keys(techData),
                    labels: {
                        style: {
                            fontSize: "14px",
                            fontFamily: "JetBrains Mono",
                        },
                    },
                },
                yaxis: {
                    labels: {
                        style: {
                            fontSize: "16px",
                            fontFamily: "JetBrains Mono",
                        },
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        borderRadius: 10,
                        barHeight: "80%",
                    },
                },
                fill: { colors: ["#8DA2FB"] },
                tooltip: {
                    theme: "light",
                    style: { fontSize: "14px", fontFamily: "JetBrains Mono" },
                },
            });

            setChartSeries([
                { name: "Mentions in Job Ads", data: Object.values(techData) },
            ]);

            const {
                topSkills,
                skillRanks,
                skillPositions,
                skillGrowth,
                skillMonths,
            } = processingSkills(data);
            setTopSkills(topSkills);
            setSkillRanks(skillRanks);
            setskillPositions(skillPositions);
            setSkillGrowth(skillGrowth);
            setSkillMonths(skillMonths);
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

    const toggleView = () => {
        setShowChart(!showChart);
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
                  .map((term: string) => term.trim().toLowerCase());

              return searchTerms.some((term: string) =>
                  skill.toLowerCase().includes(term)
              );
          })
        : [];

    return (
        <div className="app">
            <header className="p-4 pt-40 mb-10 text-center animation glow delay-1">
                <h2 className="mt-10 text-4xl font-bold">
                    Discover the most wanted skills by recruiters
                </h2>
                <h2 className="mt-8 text-xl">
                    Browse skills required for your job position
                </h2>
            </header>

            <div className="flex flex-col items-center justify-center mt-20 mb-16 sm:flex-row animation glow delay-2">
                <div
                    id="jobAdsCount"
                    className="text-2xl font-semibold text-center sm:mr-10"
                ></div>
                <div
                    id="skillCount"
                    className="mt-5 text-2xl font-semibold text-center sm:ml-10 sm:mt-0"
                ></div>
            </div>

            <div className="flex flex-col items-center justify-center mx-auto mb-8 text-center animation glow delay-3 sm:flex-row">
                <button
                    onClick={toggleView}
                    className="inline-flex items-center justify-center px-8 py-4 text-sm text-white bg-indigo-500 border border-2 border-indigo-500 rounded hover:bg-indigo-500 hover:shadow-lg"
                >
                    {showChart ? (
                        <>
                            <span className="mr-3">Search your skills</span>
                            <img
                                src="/assets/icons/search.svg"
                                alt="arrow-right"
                                className="w-5"
                            />
                        </>
                    ) : (
                        <>
                            <img
                                src="/assets/icons/arrow-right.svg"
                                alt="arrow-right"
                                className="w-5 transition-transform rotate-180"
                            />
                            <span className="ml-3">Back to chart view</span>
                        </>
                    )}
                </button>
                <Link to="/trends" className="mt-4 ml-0 sm:ml-8 sm:mt-0">
                    <button className="inline-flex items-center justify-center px-8 py-4 text-sm text-indigo-500 border border-2 border-indigo-300 rounded bg-indigo-50 hover:bg-indigo-50 hover:shadow-md">
                        View Trends
                        <img
                            src="/assets/icons/chart.svg"
                            alt="arrow-right"
                            className="w-5 ml-3"
                        />
                    </button>
                </Link>
            </div>
            <div className="max-w-screen-lg p-4 mx-auto mt-0 mb-40 animation glow delay-3">
                {showChart ? (
                    chartOptions &&
                    chartSeries && (
                        <Chart
                            options={chartOptions}
                            series={chartSeries}
                            type="bar"
                            height="5200"
                        />
                    )
                ) : (
                    <div>
                        <div className="px-4 mb-4 text-center sm:px-0 animation glow delay-1">
                            <input
                                type="text"
                                placeholder="React JavaScript"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full max-w-sm p-3 border border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 hover:border-indigo-500 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                        <div className="mx-auto text-center animation glow delay-1">
                            <p className="w-full mx-auto text-xs text-gray-500">
                                Search multiple skills by separating them with a
                                space
                            </p>
                        </div>
                        <div className="grid max-w-screen-sm grid-cols-1 gap-4 px-4 mx-auto mt-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 mb-80 animation glow delay-1">
                            {filteredSkills.map(([skill, count]) => (
                                <div
                                    key={skill}
                                    className="flex items-start p-6 transition-shadow duration-200 bg-gray-100 border border-transparent shadow-md cursor-pointer rounded-xl hover:shadow-lg hover:border-indigo-300"
                                    onClick={() =>
                                        handleCardClick(skill, count)
                                    }
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
                                                    skillGrowth[
                                                        skill
                                                    ].startsWith("+")
                                                        ? "text-green-500 font-bold"
                                                        : "text-red-500 font-bold"
                                                }
                                            >
                                                {skillGrowth
                                                    ? skillGrowth[skill]
                                                    : "TBA"}
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
                )}
            </div>
        </div>
    );
};

export default Home;
