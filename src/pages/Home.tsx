import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import countSkills from "../util/countSkills";
import processSkills from "../util/processSkills";
import { animateCount } from "../util/animateCount";

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
        }

        init();
    }, []);

    useEffect(() => {
        const jobAdsCountElement = document.getElementById("jobAdsCount");
        animateCount(jobAdsCountElement, jobAdsCount, 3000, "job ads analyzed");

        const skillCountElement = document.getElementById("skillCount");
        animateCount(skillCountElement, skillCount, 3000, "skills found");
    }, [jobAdsCount, skillCount]);

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
                <Link to="/search">
                    <button className="inline-flex items-center justify-center px-8 py-4 text-sm text-white bg-indigo-500 border border-2 border-indigo-500 rounded hover:bg-indigo-500 hover:shadow-lg">
                        <span className="mr-3">Search your skills</span>
                        <img
                            src="/assets/icons/search.svg"
                            alt="arrow-right"
                            className="w-5"
                        />
                    </button>
                </Link>
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
                {chartOptions && chartSeries && (
                    <Chart
                        options={chartOptions}
                        series={chartSeries}
                        type="bar"
                        height="5200"
                    />
                )}
            </div>
        </div>
    );
};

export default Home;
