"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Job {
  skills?: string[];
  tools?: string[];
  month: string;
  year: string;
}

async function getData() {
  const response = await fetch("/data/all.json");
  const data: Job[] = await response.json();
  return data;
}

export default function TrendsTechChart() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [chartOptions, setChartOptions] = useState<ApexOptions | null>(null);
  const [chartSeries, setChartSeries] = useState<
    { name: string; data: number[] }[] | null
  >(null);

  useEffect(() => {
    async function init() {
      const rawData = await getData();

      const monthMap: Record<string, number> = {
        january: 1,
        february: 2,
        march: 3,
        april: 4,
        may: 5,
        june: 6,
        july: 7,
        august: 8,
        september: 9,
        october: 10,
        november: 11,
        december: 12,
      };

      // 为每项技术构建每月计数。
      const monthlyCounts: Record<string, Record<string, number>> = {};
      const techDisplayMap: Record<string, string> = {};

      rawData.forEach((job) => {
        if (!job.month || !job.year) return;
        const monthNum = monthMap[job.month.toLowerCase()];
        if (!monthNum) return;
        const monthKey = `${job.year}-${monthNum.toString().padStart(2, "0")}`;

        if (!monthlyCounts[monthKey]) {
          monthlyCounts[monthKey] = {};
        }

        const technologies = [...(job.skills || []), ...(job.tools || [])];
        const uniqueTechs = new Set(technologies.map((t) => t.toLowerCase()));

        uniqueTechs.forEach((techLower) => {
          if (!techDisplayMap[techLower]) {
            techDisplayMap[techLower] =
              technologies.find((t) => t.toLowerCase() === techLower) ||
              techLower;
          }
          monthlyCounts[monthKey][techLower] =
            (monthlyCounts[monthKey][techLower] || 0) + 1;
        });
      });

      const sortedMonths = Object.keys(monthlyCounts).sort((a, b) => {
        return new Date(a + "-01").getTime() - new Date(b + "-01").getTime();
      });

      const searchTechs = searchTerm
        .trim()
        .split(/\s+/)
        .filter((t) => t);
      let techSet: Set<string>;

      if (searchTechs.length > 0) {
        techSet = new Set(searchTechs.map((t) => t.toLowerCase()));
      } else {
        techSet = new Set();
        sortedMonths.forEach((month) => {
          Object.keys(monthlyCounts[month]).forEach((tech) => {
            techSet.add(tech);
          });
        });
      }

      const series = Array.from(techSet).map((tech) => {
        const dataPoints = sortedMonths.map(
          (month) => monthlyCounts[month][tech] || 0
        );
        return {
          name: techDisplayMap[tech] || tech,
          data: dataPoints,
        };
      });

      setChartSeries(series);

      setChartOptions({
        chart: {
          type: "line",
          height: 500,
          zoom: { enabled: false },
        },
        dataLabels: { enabled: false },
        stroke: { width: 3, curve: "smooth" },
        markers: {
          size: 8,
          strokeWidth: 2,
          hover: { size: 8 },
        },
        xaxis: {
          categories: sortedMonths,
          title: {
            text: "月份",
            style: { fontSize: "14px", fontFamily: "JetBrains Mono" },
          },
          labels: { rotate: -45 },
          tickPlacement: "on",
        },
        yaxis: {
          title: {
            text: "提及次数",
            style: { fontSize: "14px", fontFamily: "JetBrains Mono" },
          },
          min: 0,
        },
        grid: {
          show: true,
          borderColor: "#e7e7e7",
          strokeDashArray: 5,
        },
        legend: {
          position: "right",
          offsetY: 0,
        },
        tooltip: {
          shared: false,
          intersect: true,
          y: {
            formatter: (val: number) => `${val} 次提及`,
          },
          marker: {
            show: false,
          },
        },
      });
    }

    init();
  }, [searchTerm]);

  return (
    <>
      <header className="mt-48 text-center animation glow delay-1">
        <h2 className="p-4 text-4xl font-bold sm:p-0">
          招聘者最想要的技能趋势图
        </h2>
        <h2 className="p-4 mt-8 text-xl sm:p-0">
          浏览你职位所需的技能趋势
        </h2>
      </header>

      <div className="max-w-sm px-4 mx-auto mt-20 sm:px-0 animation glow delay-1">
        <input
          type="text"
          className="w-full p-4 bg-white border-2 border-indigo-500 rounded-lg shadow shadow-indigo-500 focus:outline-none focus:ring-0"
          placeholder="React JavaScript"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          maxLength={40}
        />
        <p className="mt-4 text-center text-xs text-gray-500 sm:px-0 px-4">
          💡 可用空格分隔多个技能进行搜索
        </p>
      </div>

      <p className="max-w-screen-sm mx-auto mt-10 text-sm text-center sm:px-0 px-4 animation glow delay-1">
        {searchTerm &&
          searchTerm
            .trim()
            .split(/\s+/)
            .map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 mr-1 text-black rounded bg-indigo-50"
              >
                {tech}
              </span>
            ))}
      </p>

      <div className="max-w-screen-lg p-4 mx-auto mb-40 bg-white rounded-lg shadow-lg animation glow delay-2">
        {chartOptions && chartSeries && (
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="line"
            height={600}
          />
        )}
      </div>
    </>
  );
}
