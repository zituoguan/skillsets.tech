import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import processTrendsData from "../util/processTrendsData";
import processTrendsDataChart from "../util/processTrendsDataChart";

async function getData() {
    const response = await fetch(`/data/all.json`);
    const data = await response.json();
    return data;
}

const TrendsData = ({ skills }: { skills: string[] | null }) => {
    const [chartOptions, setChartOptions] = useState<ApexOptions | null>(null);
    const [chartSeries, setChartSeries] = useState<
        { name: string; data: number[] }[] | null
    >(null);

    useEffect(() => {
        async function init() {
            const rawData = await getData();

            const trendData = processTrendsData(rawData);
            const { series, months } = processTrendsDataChart(
                trendData,
                skills
            );

            setChartOptions({
                chart: {
                    type: "line",
                    height: 600,
                    zoom: {
                        enabled: false,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    width: 3,
                    curve: "smooth",
                },
                markers: {
                    size: 6,
                    strokeWidth: 2,
                    hover: {
                        size: 8,
                    },
                },
                xaxis: {
                    categories: months,
                    title: {
                        text: "Months",
                        style: {
                            fontSize: "16px",
                            fontFamily: "JetBrains Mono",
                        },
                    },
                    labels: {
                        rotate: -45,
                    },
                    tickPlacement: "on",
                },
                yaxis: {
                    title: {
                        text: "Number of Mentions",
                        style: {
                            fontSize: "16px",
                            fontFamily: "JetBrains Mono",
                        },
                    },
                    min: 0,
                },
                grid: {
                    show: true,
                    borderColor: "#e7e7e7",
                    strokeDashArray: 10,
                },
                legend: {
                    position: "right",
                    offsetY: 0,
                },
                tooltip: {
                    shared: false,
                    intersect: true,
                    y: {
                        formatter: (val: number) => `${val} mentions`,
                    },
                },
            });

            setChartSeries(series);
        }

        init();
    }, [skills]);

    return (
        <div className="app animation glow delay-3">
            <p className="text-sm mt-10 text-center max-w-screen-sm mx-auto">
                {skills &&
                    skills.map((skill, index) => (
                        <span
                            key={index}
                            className="text-black bg-indigo-50 px-2 py-1 mr-1 rounded"
                        >
                            {skill}
                        </span>
                    ))}
            </p>
            <div className="mb-40 mx-auto max-w-screen-xl p-4 animation glow delay-1">
                {chartOptions && chartSeries && (
                    <Chart
                        options={chartOptions}
                        series={chartSeries}
                        type="line"
                        height={600}
                    />
                )}
            </div>
        </div>
    );
};

export default TrendsData;
