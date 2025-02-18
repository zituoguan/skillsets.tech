"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { animateCount } from "@/utils/animateCount";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Home() {
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState<
    { name: string; data: number[] }[]
  >([]);
  const [jobAdsCount, setJobAdsCount] = useState(0);
  const [uniqueSkillsCount, setUniqueSkillsCount] = useState(0);

  useEffect(() => {
    const init = async () => {
      const response = await fetch("/data/all.json");
      const data = await response.json();

      const totalJobs = data.length;
      const skillCounts: { [skill: string]: number } = {};
      const skillOriginalMap: Record<string, string> = {};

      data.forEach((job: { skills: string[] }) => {
        if (!job.skills) return;
        const uniqueSkills = new Set(
          job.skills.map((s: string) => s.toLowerCase())
        );
        uniqueSkills.forEach((lowerSkill) => {
          if (!skillOriginalMap[lowerSkill]) {
            skillOriginalMap[lowerSkill] =
              job.skills.find((s: string) => s.toLowerCase() === lowerSkill) ||
              lowerSkill;
          }
          skillCounts[lowerSkill] = (skillCounts[lowerSkill] || 0) + 1;
        });
      });

      const sortedSkills = Object.entries(skillCounts).sort(
        ([, countA], [, countB]) => countB - countA
      );

      const sortedSkillNames = sortedSkills.map(
        ([lowerSkill]) => skillOriginalMap[lowerSkill]
      );
      const sortedSkillCounts = sortedSkills.map(([, count]) => count);

      animateCount(totalJobs, 5000, 300, setJobAdsCount);
      animateCount(
        Object.keys(skillCounts).length,
        5000,
        300,
        setUniqueSkillsCount
      );

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
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: sortedSkillNames,
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
        fill: { colors: ["#6875F5"] },
        tooltip: {
          theme: "light",
          style: { fontSize: "14px", fontFamily: "JetBrains Mono" },
          marker: {
            show: false,
          },
        },
      });

      setChartSeries([
        { name: "Mentions in Job Ads", data: sortedSkillCounts },
      ]);
    };

    init();
  }, []);

  return (
    <>
      <header className="mt-48 text-center animation glow delay-1">
        <h1 className="text-4xl font-bold">
          Discover the most wanted skills by recruiters
        </h1>
        <h2 className="p-4 mt-8 text-xl sm:p-0">
          Browse skills required for your job position
        </h2>
      </header>

      <div className="flex flex-col items-center justify-center mt-20 space-y-10 text-center md:flex-row md:space-x-10 md:space-y-0 animation glow delay-1">
        <div>
          <p className="font-bold text-indigo-500 text-7xl">{jobAdsCount}</p>
          <br />
          <p className="text-xl font-bold">job ads analyzed</p>
        </div>
        <div>
          <p className="font-bold text-indigo-500 text-7xl">
            {uniqueSkillsCount}
          </p>
          <br />
          <p className="text-xl font-bold">skills found</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mx-auto mb-8 text-center animation glow delay-1 sm:flex-row mt-20">
        <Link href="/search">
          <button className="inline-flex items-center justify-center px-8 py-4 text-sm text-white bg-indigo-500 border border-2 border-indigo-500 rounded hover:bg-indigo-500 hover:shadow-lg">
            <span className="mr-3">Search your skills</span>
            <img
              src="/assets/icons/search.svg"
              alt="arrow-right"
              className="w-5"
            />
          </button>
        </Link>
        <Link href="/chart" className="mt-4 ml-0 sm:ml-8 sm:mt-0">
          <button className="inline-flex items-center justify-center px-8 py-4 text-sm text-indigo-500 border border-2 border-indigo-300 rounded bg-indigo-50 hover:bg-indigo-50 hover:shadow-md">
            View skills chart
            <img
              src="/assets/icons/chart.svg"
              alt="arrow-right"
              className="w-5 ml-3"
            />
          </button>
        </Link>
      </div>

      <div className="max-w-screen-lg p-4 mx-auto mt-10 mb-40 animation glow delay-2">
        {chartOptions && chartSeries && (
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height="12000"
          />
        )}
      </div>
    </>
  );
}
