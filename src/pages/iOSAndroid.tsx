import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

async function getData() {
    const response = await fetch("/data/mobile.json");
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

function countSkills(data: { skills: string[] }[]) {
    const skillSet = new Set<string>();
    data.forEach((item) => {
        item.skills.forEach((skill: string) => {
            skillSet.add(skill);
        });
    });
    return skillSet.size;
}

const Mobile = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [chartOptions, setChartOptions] = useState<any>(null);
    const [chartSeries, setChartSeries] = useState<
        { name: string; data: number[] }[] | null
    >(null);
    const [jobAdsCount, setJobAdsCount] = useState(0);
    const [skillCount, setSkillCount] = useState(0);
    const [loading, setLoading] = useState(true);

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
                            fontSize: "18px",
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
                    colors: ["#6875F5"],
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
            setLoading(false);
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
            <header className="text-center pt-40 mb-10 p-4">
                <p className="text-4xl font-bold mt-10">
                    The most wanted
                    <span className="text-indigo-500"> iOS/Android </span>
                    skills
                </p>
                <p className="text-xl mt-8">
                    Browse skills required for your job position
                </p>
            </header>
            {loading && (
                <div className="mx-auto text-center">
                    <div className="animate-spin">
                        <svg
                            aria-hidden="true"
                            className="w-12 h-12 mx-auto text-gray-200 text-center animate-spin fill-indigo-500"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                    </div>
                    <p className="mt-4 text-gray-500">Loading data...</p>
                </div>
            )}
            {!loading && (
                <>
                    <div className="flex flex-col sm:flex-row justify-center items-center mt-20 mb-10">
                        <div
                            id="jobAdsCount"
                            className="text-center text-2xl font-semibold sm:mr-10"
                        ></div>
                        <div
                            id="skillCount"
                            className="text-center text-2xl font-semibold sm:ml-10 mt-5 sm:mt-0"
                        ></div>
                    </div>
                    <div className="mt-0 mb-40 mx-auto sm:w-2/3 w-full p-4 overflow-x-hidden">
                        {chartOptions && chartSeries && (
                            <Chart
                                options={chartOptions}
                                series={chartSeries}
                                type="bar"
                                height="800"
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Mobile;
