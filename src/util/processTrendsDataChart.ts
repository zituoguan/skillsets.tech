export default function processTrendsDataChart(
    trendData: Record<string, Record<string, number>>,
    skills: string[] | null
) {
    const monthOrder = [
        "january", "february", "march", "april", "may", "june", "july",
        "august", "september", "october", "november", "december"
    ];

    const months = Object.keys(trendData).sort(
        (a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b)
    );

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