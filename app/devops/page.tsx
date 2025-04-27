"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { calculateAverageTrend } from "@/utils/calculateTrends";
import { animateCount } from "@/utils/animateCount";

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
  const [jobAdsCount, setJobAdsCount] = useState(0);
  const [uniqueSkillsCount, setUniqueSkillsCount] = useState(0);

  useEffect(() => {
    const fetchSkillsData = async () => {
      const response = await fetch("/data/devops/devops.json");
      const data = await response.json();

      const totalJobs = data.length;
      const allSkills = data.flatMap((job: any) => job.skills || []);

      const uniqueSkills = new Set(allSkills);

      animateCount(totalJobs, 3000, 300, setJobAdsCount);
      animateCount(uniqueSkills.size, 3000, 300, setUniqueSkillsCount);

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
          最受招聘者欢迎的{" "}
          <span className="font-bold text-indigo-500">DevOps</span> 技能
        </h2>
        <h2 className="p-4 mt-8 text-xl sm:p-0">
          浏览你职位所需的技能
        </h2>
      </header>

      <div className="flex flex-col items-center justify-center mt-20 space-y-10 text-center md:flex-row md:space-x-10 md:space-y-0 animation glow delay-1">
        <div>
          <p className="font-bold text-indigo-500 text-7xl">{jobAdsCount}</p>
          <br />
          <p className="text-xl font-bold">已分析职位广告</p>
        </div>
        <div>
          <p className="font-bold text-indigo-500 text-7xl">
            {uniqueSkillsCount}
          </p>
          <br />
          <p className="text-xl font-bold">发现的技能</p>
        </div>
      </div>

      <div className="max-w-sm px-4 mx-auto mt-20 sm:px-0 animation glow delay-1">
        <input
          type="text"
          className="w-full p-4 bg-white border-2 border-indigo-500 rounded-lg shadow shadow-indigo-500 focus:outline-none focus:ring-0"
          placeholder="React JavaScript"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mt-4 text-center animation glow delay-1">
        <button
          className="inline-flex items-center justify-center px-8 py-4 mt-8 text-sm text-white bg-indigo-500 border border-2 border-indigo-500 rounded hover:bg-indigo-500 hover:shadow-lg"
          onClick={() => setSortByTrend(!sortByTrend)}
        >
          {sortByTrend ? "按数量排序" : "按趋势排序"}
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
                href={`/devops/skill/${encodeURIComponent(skill.skill)}`}
                key={skill.skill}
              >
                <div className="flex items-center p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg bg-indigo-50 hover:border hover:border-indigo-500">
                  <div className="flex items-center justify-center text-xl font-bold text-white bg-indigo-500 rounded-full w-12 h-12">
                    #{skill.rank}
                  </div>
                  <div className="flex-grow my-2 ml-8">
                    <p className="text-lg font-semibold">{skill.skill}</p>
                    <p>{skill.count} 次提及</p>
                  </div>
                  <div className="ml-auto">
                    <div className="px-2 py-2 text-sm text-lg font-bold border border-indigo-500 rounded w-[75.2px] text-center">
                      <p className="mb-1 text-xs font-normal">趋势</p>
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
