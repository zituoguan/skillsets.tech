import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import countSkills from "../util/countSkills";

async function getData() {
    const response = await fetch("/data/project-management.json");
    const data = await response.json();
    return data;
}

function processSkills(data: { skills: string[] }[]) {
    const skillCount: Record<string, number> = {};
    data.forEach((item) => {
        item.skills.forEach((skill: string) => {
            skillCount[skill] = (skillCount[skill] || 0) + 1;
        });
    });
    return Object.entries(skillCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 40)
        .reduce((obj: Record<string, number>, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});
}

const Management = () => {
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
                            backgroundBarOpacity: 1,
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

    const animateCount = (
        element: HTMLElement | null,
        endValue: number,
        duration: number,
        text: string
    ) => {
        let startTime: number | null = null;

        function animate(currentTime: number) {
            if (startTime === null) startTime = currentTime;
            const progress = currentTime - startTime;
            const currentValue = Math.min(
                Math.floor((progress / duration) * endValue),
                endValue
            );
            if (element) {
                element.innerHTML = `
        <p class="text-indigo-500 text-7xl font-bold">${currentValue}</p>
        <p class="font-normal text-2xl mt-8">${text}</p>
        `;
            }
            if (currentValue < endValue) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    };

    useEffect(() => {
        const jobAdsCountElement = document.getElementById("jobAdsCount");
        animateCount(jobAdsCountElement, jobAdsCount, 3000, "job ads analyzed");

        const skillCountElement = document.getElementById("skillCount");
        animateCount(skillCountElement, skillCount, 3000, "skills found");
    }, [jobAdsCount, skillCount]);

    return (
        <div className="app">
            <header className="text-center pt-40 mb-10 p-4 animation glow delay-1">
                <p className="text-4xl font-bold mt-10">
                    The most wanted
                    <span className="text-indigo-500"> Management </span>
                    skills
                </p>
                <p className="text-xl mt-8">
                    Browse skills required for your job position
                </p>
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
                        height="1100"
                    />
                )}
            </div>
        </div>
    );
};

export default Management;
