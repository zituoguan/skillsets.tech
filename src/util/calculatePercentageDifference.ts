export default function calculatePercentageDifference(
    current: number,
    previous: number
): string {
    if (previous === 0) return "TBA";
    const difference = ((current - previous) / previous) * 100;
    const roundedDifference = Math.round(difference * 100) / 100;
    return roundedDifference > 0
        ? `+${roundedDifference}%`
        : `${roundedDifference}%`;
}