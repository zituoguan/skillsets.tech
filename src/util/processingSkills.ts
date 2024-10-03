function calculateDifference(current: number, previous: number): number {
    if (previous === 0) return NaN;
    return ((current - previous) / previous) * 100;
}

export function calculateGrowth(mentionsByMonth: Record<string, number>): string {
    const monthsOrder = [
        "june",
        "july",
        "august",
        "september",
        "october",
    ];

    const mentionsWithAllMonths = monthsOrder.map((month) => ({
        month,
        mentions: mentionsByMonth[month] || 0,
    }));

    const totalMentions = mentionsWithAllMonths.reduce((sum, { mentions }) => sum + mentions, 0);
    if (totalMentions === 0) return "TBA";

    const firstMonthMentions = mentionsWithAllMonths[0].mentions;
    const lastMonthMentions = mentionsWithAllMonths[mentionsWithAllMonths.length - 1].mentions;

    const overallGrowth = calculateDifference(lastMonthMentions, firstMonthMentions);

    if (isNaN(overallGrowth)) {
        return "TBA";
    }

    const roundedGrowth = Math.round(overallGrowth * 100) / 100;

    return roundedGrowth > 0 ? `+${roundedGrowth}%` : `${roundedGrowth}%`;
}

export default function processSkills(
    data: { skills: string[]; industry: string; month: string }[]
) {
    const skillCount: Record<string, number> = {};
    const skillIndustries: Record<string, Record<string, number>> = {};
    const skillMonths: Record<string, Record<string, number>> = {};
    const skillGrowth: Record<string, string> = {};

    data.forEach((item) => {
        const month = item.month.toLowerCase();
        item.skills.forEach((skill: string) => {
            skillCount[skill] = (skillCount[skill] || 0) + 1;

            if (!skillMonths[skill]) {
                skillMonths[skill] = {};
            }

            skillMonths[skill][month] = (skillMonths[skill][month] || 0) + 1;

            let industry = item.industry.toLowerCase();
            const excludedIndustries = ["senior", "mid", "junior"];
            if (excludedIndustries.includes(industry)) {
                industry = industry.charAt(0).toUpperCase() + industry.slice(1);
            }

            if (!excludedIndustries.includes(item.industry.toLowerCase())) {
                if (!skillIndustries[skill]) {
                    skillIndustries[skill] = {};
                }
                skillIndustries[skill][item.industry] =
                    (skillIndustries[skill][item.industry] || 0) + 1;
            }
        });
    });

    Object.keys(skillMonths).forEach((skill) => {
        skillGrowth[skill] = calculateGrowth(skillMonths[skill]);
    });

    const sortedSkills = Object.entries(skillCount).sort((a, b) => b[1] - a[1]);

    const skillRanks: Record<string, number> = {};
    sortedSkills.forEach(([skill], index) => {
        skillRanks[skill] = index + 1;
    });

    const skillPositions: Record<string, string[]> = {};
    Object.keys(skillIndustries).forEach((skill) => {
        const industries = Object.entries(skillIndustries[skill]).sort(
            (a, b) => b[1] - a[1]
        );
        skillPositions[skill] = industries.slice(0, 3).map(([industry]) => {
            return industry.charAt(0).toUpperCase() + industry.slice(1);
        });
    });

    return {
        skillRanks,
        skillPositions,
        topSkills: sortedSkills.slice(0, 100),
        skillMonths,
        skillGrowth,
        calculateGrowth,
    };
}
