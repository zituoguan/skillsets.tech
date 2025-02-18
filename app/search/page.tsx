"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { calculateAverageTrend } from "@/utils/calculateTrends";

interface SkillData {
  cagrTrend: any;
  medianTrend: any;
  skill: string;
  count: number;
  rank: number;
  averageTrend: string;
}

export default function Search() {
  const [skillsData, setSkillsData] = useState<SkillData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByTrend, setSortByTrend] = useState(false);

  useEffect(() => {
    const fetchSkillsData = async () => {
      const response = await fetch("/data/all.json");
      const data = await response.json();

      const skillsMap: {
        [key: string]: {
          skill: string;
          count: number;
          monthCounts: { [key: string]: number };
        };
      } = {};

      data.forEach((job: any) => {
        if (!job.skills) return;
        const uniqueSkills = Array.from(
          new Set<string>(job.skills.map((s: string) => s.toLowerCase()))
        );
        uniqueSkills.forEach((lowerSkill: string) => {
          const originalSkill =
            job.skills.find((s: string) => s.toLowerCase() === lowerSkill) ||
            lowerSkill;
          if (!skillsMap[lowerSkill]) {
            skillsMap[lowerSkill] = {
              skill: originalSkill,
              count: 0,
              monthCounts: {},
            };
          }
          skillsMap[lowerSkill].count += 1;
          if (job.month && job.year) {
            const compositeKey = `${job.month.toLowerCase()}-${job.year.toString()}`;
            skillsMap[lowerSkill].monthCounts[compositeKey] =
              (skillsMap[lowerSkill].monthCounts[compositeKey] || 0) + 1;
          }
        });
      });

      const skillsArray = Object.values(skillsMap).map((skillData) => {
        const trends = calculateAverageTrend(skillData.monthCounts);
        return {
          skill: skillData.skill,
          count: skillData.count,
          ...trends,
        };
      });

      const sortedSkills = skillsArray
        .sort((a, b) => b.count - a.count)
        .map((item, index) => ({ ...item, rank: index + 1 }));

      setSkillsData(sortedSkills);
    };

    fetchSkillsData();
  }, []);

  const filteredAndSortedSkills = [...skillsData]
    .filter((skill) => {
      if (searchTerm.trim() === "") return true;
      const searchTerms = searchTerm.toLowerCase().split(" ").filter(Boolean);
      return searchTerms.some((term) =>
        skill.skill.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      if (sortByTrend) {
        const trendA = parseFloat(a.medianTrend.replace("%", ""));
        const trendB = parseFloat(b.medianTrend.replace("%", ""));
        return trendB - trendA;
      }
      return b.count - a.count;
    });

  return (
    <>
      <header className="mt-48 text-center animation glow delay-1">
        <h2 className="p-4 text-4xl font-bold sm:p-0">
          Search the most wanted skills by recruiters
        </h2>
        <h2 className="p-4 mt-8 text-xl sm:p-0">
          Browse skills required for your job position
        </h2>
      </header>

      <div className="max-w-sm px-4 mx-auto mt-20 sm:px-0 animation glow delay-1">
        <input
          type="text"
          className="w-full p-4 bg-white border-2 border-indigo-500 rounded-lg shadow shadow-indigo-500 focus:outline-none focus:ring-0"
          placeholder="React JavaScript"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mx-auto mt-4 text-center animation glow delay-1">
        <p className="mb-4 text-sm">Or search by job position</p>
        <div className="flex flex-wrap justify-center max-w-screen-sm gap-2 mx-auto">
          <Link href="/frontend">
            <div className="px-3 py-2 text-xs text-indigo-500 border border-2 border-indigo-300 rounded bg-indigo-50 hover:bg-indigo-50 hover:shadow-md">
              <p>Frontend</p>
            </div>
          </Link>
          <Link href="/backend">
            <div className="px-3 py-2 text-xs text-indigo-500 border border-2 border-indigo-300 rounded bg-indigo-50 hover:bg-indigo-50 hover:shadow-md">
              <p>Backend</p>
            </div>
          </Link>
          <Link href="/devops">
            <div className="px-3 py-2 text-xs text-indigo-500 border border-2 border-indigo-300 rounded bg-indigo-50 hover:bg-indigo-50 hover:shadow-md">
              <p>DevOps</p>
            </div>
          </Link>
          <Link href="/data">
            <div className="px-3 py-2 text-xs text-indigo-500 border border-2 border-indigo-300 rounded bg-indigo-50 hover:bg-indigo-50 hover:shadow-md">
              <p>Data</p>
            </div>
          </Link>
          <Link href="/full-stack">
            <div className="px-3 py-2 text-xs text-indigo-500 border border-2 border-indigo-300 rounded bg-indigo-50 hover:bg-indigo-50 hover:shadow-md">
              <p>Full Stack</p>
            </div>
          </Link>
          <Link href="/design">
            <div className="px-3 py-2 text-xs text-indigo-500 border border-2 border-indigo-300 rounded bg-indigo-50 hover:bg-indigo-50 hover:shadow-md">
              <p>UX / UI</p>
            </div>
          </Link>
          <Link href="/quality-assurance">
            <div className="px-3 py-2 text-xs text-indigo-500 border border-2 border-indigo-300 rounded bg-indigo-50 hover:bg-indigo-50 hover:shadow-md">
              <p>Quality Assurance</p>
            </div>
          </Link>
          <Link href="/mobile">
            <div className="px-3 py-2 text-xs text-indigo-500 border border-2 border-indigo-300 rounded bg-indigo-50 hover:bg-indigo-50 hover:shadow-md">
              <p>iOS / Android</p>
            </div>
          </Link>
          <Link href="/management">
            <div className="px-3 py-2 text-xs text-indigo-500 border border-2 border-indigo-300 rounded bg-indigo-50 hover:bg-indigo-50 hover:shadow-md">
              <p>Project Management</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="mt-4 text-center animation glow delay-1">
        <button
          className="inline-flex items-center justify-center px-8 py-4 mt-8 text-sm text-white bg-indigo-500 border border-2 border-indigo-500 rounded hover:bg-indigo-500 hover:shadow-lg"
          onClick={() => setSortByTrend(!sortByTrend)}
        >
          {sortByTrend ? "Sort by Count" : "Sort by Trend"}
          <img
            src="/assets/icons/sort.svg"
            alt="arrow-right"
            className="w-5 ml-2"
          />
        </button>
      </div>

      <div className="max-w-screen-sm p-4 mx-auto mt-10 mb-40 animation glow delay-1">
        <div className="grid grid-cols-1 gap-6">
          {filteredAndSortedSkills.map((skill) => {
            return (
              <Link
                href={`/skill/${encodeURIComponent(skill.skill)}`}
                key={skill.skill}
              >
                <div className="flex items-center p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg bg-indigo-50">
                  <div className="flex items-center justify-center text-xl font-bold text-white bg-indigo-500 rounded-full w-13 h-13">
                    #{skill.rank}
                  </div>
                  <div className="flex-grow my-2 ml-8">
                    <p className="text-lg font-semibold">{skill.skill}</p>
                    <p>{skill.count} mentions</p>
                  </div>
                  <div className="ml-auto">
                    <div className="px-2 py-2 text-sm text-lg font-bold border border-indigo-500 rounded">
                      <p className="mb-1 text-xs font-normal">Trending</p>
                      <span
                        className={`${
                          parseFloat(skill.medianTrend.replace("%", "")) > 0
                            ? "text-green-500"
                            : parseFloat(skill.medianTrend.replace("%", "")) < 0
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        {skill.medianTrend}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
