"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ApexOptions } from "apexcharts";
import { calculateAverageTrend } from "@/utils/calculateTrends";

interface SkillData {
  skill: string;
  count: number;
  rank: number;
  monthCounts?: { [compositeKey: string]: number };
}

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function SkillDetail() {
  const { skill } = useParams();
  const [skillInfo, setSkillInfo] = useState<SkillData | null>(null);
  const [complimentarySkills, setComplimentarySkills] = useState<{
    higherSkills: { skill: string; count: number }[];
    lowerSkills: { skill: string; count: number }[];
  }>({ higherSkills: [], lowerSkills: [] });
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchSkillData = async () => {
      const response = await fetch("/data/backend/backend.json");
      const data = await response.json();

      const allSkills = data.flatMap((item: any) => item.skills);
      const skillCounts: { [key: string]: number } = {};
      allSkills.forEach((s: string) => {
        skillCounts[s] = (skillCounts[s] || 0) + 1;
      });

      const sortedSkills = Object.entries(skillCounts)
        .map(([skill, count]) => ({ skill, count }))
        .sort((a, b) => b.count - a.count)
        .map((item, index) => ({
          ...item,
          rank: index + 1,
        }));

      const selectedSkill = Array.isArray(skill) ? skill[0] : skill || "";
      const foundSkill = sortedSkills.find(
        (item) => item.skill.toLowerCase() === selectedSkill.toLowerCase()
      );

      if (!foundSkill) {
        setSkillInfo(null);
        return;
      }

      const monthCounts: { [key: string]: number } = {};
      const industryCounts: { [key: string]: number } = {};

      data.forEach((job: any) => {
        if (
          job.skills.some(
            (s: string) => s.toLowerCase() === selectedSkill.toLowerCase()
          )
        ) {
          const month = job.month ? job.month.toLowerCase() : "";
          const year = job.year ? job.year.toString() : "";
          if (month && year) {
            const compositeKey = `${month}-${year}`;
            monthCounts[compositeKey] = (monthCounts[compositeKey] || 0) + 1;
          }
          const industry = job.industry || "Unknown";
          industryCounts[industry] = (industryCounts[industry] || 0) + 1;
        }
      });

      const sortedIndustries = Object.entries(industryCounts)
        .map(([industry, count]) => ({ industry, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);

      setSkillInfo({ ...foundSkill, monthCounts });

      const currentIndex = sortedSkills.findIndex(
        (item) => item.skill.toLowerCase() === selectedSkill.toLowerCase()
      );

      const higherSkills = sortedSkills.slice(
        Math.max(0, currentIndex - 2),
        currentIndex
      );

      const lowerSkills = sortedSkills.slice(
        currentIndex + 1,
        currentIndex + 3
      );

      setComplimentarySkills({
        higherSkills: higherSkills.map((s) => ({
          skill: s.skill,
          count: s.count,
        })),
        lowerSkills: lowerSkills.map((s) => ({
          skill: s.skill,
          count: s.count,
        })),
      });
    };

    if (skill) fetchSkillData();
  }, [skill]);

  if (!skillInfo) {
    return <></>;
  }

  const monthOrder = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const sortedMonthEntries = Object.entries(skillInfo.monthCounts || {}).sort(
    ([keyA], [keyB]) => {
      const [monthA, yearA] = keyA.split("-");
      const [monthB, yearB] = keyB.split("-");
      if (yearA !== yearB) {
        return parseInt(yearA) - parseInt(yearB);
      }
      return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
    }
  );

  const availableCompositeKeys = Object.keys(skillInfo.monthCounts || {}).sort(
    (a, b) => {
      const [monthA, yearA] = a.split("-");
      const [monthB, yearB] = b.split("-");
      if (yearA !== yearB) {
        return parseInt(yearA) - parseInt(yearB);
      }
      return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
    }
  );

  const chartCategories = availableCompositeKeys.map((key) => {
    const [month, year] = key.split("-");
    return month.charAt(0).toUpperCase() + month.slice(1) + " " + year;
  });
  const chartData = availableCompositeKeys.map(
    (key) => (skillInfo.monthCounts && skillInfo.monthCounts[key]) || 0
  );

  const chartOptions: ApexOptions = {
    chart: {
      id: "mentions-chart",
      toolbar: { show: false },
    },
    xaxis: { categories: chartCategories },
    yaxis: {
      title: { text: "Monthly mentions" },
    },
    title: {
      text: "Monthly Mentions",
      align: "center",
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#6875F5"],
    },
    markers: {
      size: 8,
      colors: ["#6875F5"],
      strokeColors: "#fff",
      strokeWidth: 2,
    },
    tooltip: {
      enabled: true,
      marker: {
        show: false,
      },
    },
  };

  const chartSeries = [{ name: "Mentions", data: chartData }];

  const overallTrend = calculateAverageTrend(skillInfo.monthCounts || {});

  const overallTrendColor = overallTrend.averageTrend.startsWith("+")
    ? "text-green-500"
    : overallTrend.averageTrend.startsWith("-")
    ? "text-red-500"
    : "text-gray-500";

  const toggleTooltip = (tooltipId: string) => {
    setActiveTooltip((prev) => (prev === tooltipId ? null : tooltipId));

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (tooltipId) {
      timeoutRef.current = setTimeout(() => {
        setActiveTooltip(null);
      }, 3000);
    }
  };

  return (
    <div className="max-w-screen-sm p-8 mx-auto mt-32 mb-40 bg-white border border-indigo-100 shadow shadow-indigo-100">
      <Link href="/backend">
        <button className="px-3 py-1 mb-4 text-sm text-gray-500 border rounded hover:bg-gray-100">
          ←
        </button>
      </Link>
      <h1 className="mb-4 text-3xl font-bold text-indigo-500">
        {skillInfo.skill}
      </h1>
      <div className="inline-flex space-x-8">
        <p className="mb-2 text-lg">
          Ranked:{" "}
          <span className="font-bold text-indigo-500">#{skillInfo.rank}</span>
        </p>
        <p className="text-lg">
          Mentions:{" "}
          <span className="font-bold text-indigo-500">{skillInfo.count}</span>
        </p>
      </div>
      <hr className="my-4" />
      <div className="mt-8">
        <h2 className="mb-8 text-xl font-bold">📈 Monthly Mentions</h2>
        <ul>
          {sortedMonthEntries.map(([compositeKey, count], index) => {
            const [monthName, year] = compositeKey.split("-");
            const displayMonth =
              monthName.charAt(0).toUpperCase() +
              monthName.slice(1) +
              " " +
              year;
            let percentageChange = "";
            if (index === 0) {
              percentageChange = "N/A";
            } else {
              const prevCount = sortedMonthEntries[index - 1][1];
              if (prevCount === 0) {
                percentageChange = count > 0 ? "∞" : "0%";
              } else {
                const change = ((count - prevCount) / prevCount) * 100;
                const rounded = Math.round(change * 10) / 10;
                percentageChange = (rounded >= 0 ? "+" : "") + rounded + "%";
              }
            }
            const percentageColor = percentageChange.startsWith("+")
              ? "text-green-500"
              : percentageChange.startsWith("-")
              ? "text-red-500"
              : "text-black";

            return (
              <li key={compositeKey} className="my-4 text-md">
                <span className="inline-block w-40">{displayMonth}</span>
                &rarr;{" "}
                <span className="ml-4 font-bold text-indigo-500">
                  {count}
                </span>{" "}
                mentions{" "}
                <span
                  className={`text-sm font-bold px-2 py-1 bg-indigo-50 border border-indigo-500 rounded ${percentageColor}`}
                >
                  {percentageChange}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="mt-8">
          <p className="my-4 text-md">
            Average trend &rarr;{" "}
            <span
              className={`${
                overallTrend.averageTrend.startsWith("+")
                  ? "text-green-500"
                  : overallTrend.averageTrend.startsWith("-")
                  ? "text-red-500"
                  : "text-green-500"
              } px-2 py-1 bg-indigo-50 font-bold border border-indigo-500 rounded text-sm`}
            >
              {overallTrend.averageTrend}
            </span>
            <span
              className="relative ml-2 text-gray-400 cursor-pointer"
              onClick={() => toggleTooltip("average")}
            >
              ℹ️
              {activeTooltip === "average" && (
                <span className="absolute w-32 px-3 py-2 text-xs text-white bg-black rounded-lg shadow-md sm:w-56 left-8 -top-4">
                  The average percentage change in mentions over time.
                </span>
              )}
            </span>
          </p>
          <p className="my-4 text-md">
            Median trend &rarr;{" "}
            <span
              className={`${
                overallTrend.medianTrend.startsWith("+")
                  ? "text-green-500"
                  : overallTrend.medianTrend.startsWith("-")
                  ? "text-red-500"
                  : "text-green-500"
              } px-2 py-1 bg-indigo-50 font-bold border border-indigo-500 rounded text-sm`}
            >
              {overallTrend.medianTrend}
            </span>
            <span
              className="relative ml-2 text-gray-400 cursor-pointer"
              onClick={() => toggleTooltip("median")}
            >
              ℹ️
              {activeTooltip === "median" && (
                <span className="absolute w-32 px-3 py-2 text-xs text-white bg-black rounded-lg shadow-md sm:w-56 left-8 -top-4">
                  The median percentage change in mentions over time.
                </span>
              )}
            </span>
          </p>
          <p className="my-4 text-md">
            CAGR trend &rarr;{" "}
            <span
              className={`${
                overallTrend.cagrTrend.startsWith("+")
                  ? "text-green-500"
                  : overallTrend.cagrTrend.startsWith("-")
                  ? "text-red-500"
                  : "text-green-500"
              } px-2 py-1 bg-indigo-50 font-bold border border-indigo-500 rounded text-sm`}
            >
              {overallTrend.cagrTrend}
            </span>
            <span
              className="relative ml-2 text-gray-400 cursor-pointer"
              onClick={() => toggleTooltip("cagr")}
            >
              ℹ️
              {activeTooltip === "cagr" && (
                <span className="absolute w-32 px-3 py-2 text-xs text-white bg-black rounded-lg shadow-md sm:w-56 left-8 -top-4">
                  The compound annual growth rate in mentions over time.
                </span>
              )}
            </span>
          </p>
        </div>
      </div>
      <div className="my-10">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="line"
          height={300}
        />
      </div>
      <hr className="my-4" />
      <div className="mt-8">
        <h2 className="mb-8 text-lg font-bold">🔗 Complementary Skills</h2>
        {complimentarySkills.higherSkills.map((skill, index) => (
          <p key={index} className="mb-4 text-md">
            <span className="text-green-500">+</span>{" "}
            <Link href={`/backend/skill/${skill.skill}`}>
              <span className="font-bold text-indigo-500 underline">
                {skill.skill}
              </span>{" "}
              <span>({skill.count} mentions)</span>
            </Link>
          </p>
        ))}
        {complimentarySkills.lowerSkills.map((skill, index) => (
          <p key={index} className="mb-4 text-md">
            <span className="text-red-500">-</span>{" "}
            <Link href={`/backend/skill/${skill.skill}`}>
              <span className="font-bold text-indigo-500 underline">
                {skill.skill}
              </span>{" "}
              <span>({skill.count} mentions)</span>
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
}
