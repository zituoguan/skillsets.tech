export default function processTrends(data: { month: string; skills: string[] }[]) {
    const trendData: Record<string, Record<string, number>> = {};

    data.forEach((item) => {
        const { month, skills } = item;
        if (!trendData[month]) {
            trendData[month] = {};
        }
        skills.forEach((skill) => {
            const skillLowerCase = skill.toLowerCase();
            trendData[month][skillLowerCase] =
                (trendData[month][skillLowerCase] || 0) + 1;
        });
    });

    return trendData;
}