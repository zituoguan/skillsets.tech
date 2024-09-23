import { useEffect, useState } from "react";
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
                    toolbar: {
                        show: true,
                    },
                    animations: {
                        enabled: true,
                        easing: "easeinout",
                        speed: 2000,
                        animateGradually: {
                            enabled: true,
                            delay: 200,
                        },
                        dynamicAnimation: {
                            enabled: true,
                            speed: 1000,
                        },
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
                        colors: {
                            backgroundBarColors: [],
                            backgroundBarOpacity: 0,
                        },
                    },
                },
                fill: {
                    colors: ["#8DA2FB"],
                },
                tooltip: {
                    theme: "light",
                    style: {
                        fontSize: "14px",
                        fontFamily: "JetBrains Mono",
                    },
                },
            });

            setChartSeries([
                {
                    name: "Mentions in Job Ads",
                    data: Object.values(techData),
                },
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
            <header className="text-center pt-40 mb-10 p-4 animation glow delay-1">
                <h2 className="text-4xl font-bold mt-10">
                    Discover the most wanted skills by recruiters
                </h2>
                <h2 className="text-xl mt-8">
                    Browse skills required for your job position
                </h2>
            </header>
            <div className="flex flex-col sm:flex-row justify-center items-center mt-20 mb-10 animation glow delay-2">
                <div
                    id="jobAdsCount"
                    className="text-center text-2xl font-semibold sm:mr-10"
                ></div>
                <div
                    id="skillCount"
                    className="text-center text-2xl font-semibold sm:ml-10 mt-5 sm:mt-0"
                ></div>
            </div>
            <div className="mt-0 mb-40 mx-auto max-w-screen-lg p-4 animation glow delay-3">
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
