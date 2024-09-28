export default function processTrendsDataChart(
    trendData: Record<string, Record<string, number>>,
    skills: string[] | null
) {
    const months = Object.keys(trendData).sort();

    const allSkills = new Set<string>();
    months.forEach((month) => {
        Object.keys(trendData[month]).forEach((skill) => allSkills.add(skill));
    });

    const skillsToDisplay = skills
        ? skills.map((skill) => skill.toLowerCase())
        : Array.from(allSkills);

    const series = skillsToDisplay.map((skill) => ({
        name: skill,
        data: months.map((month) => trendData[month][skill] || 0),
    }));

    return { series, months };
}