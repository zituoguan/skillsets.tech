export const calculateAverageTrend = (monthCounts: {
  [key: string]: number;
}) => {
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

  const entries = Object.entries(monthCounts).sort(([keyA], [keyB]) => {
    const [monthA, yearA] = keyA.split("-");
    const [monthB, yearB] = keyB.split("-");
    if (yearA !== yearB) return parseInt(yearA) - parseInt(yearB);
    return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
  });

  if (entries.length < 3) {
    return { averageTrend: "N/A", medianTrend: "N/A", cagrTrend: "N/A" };
  }

  const growthRates: number[] = [];
  for (let i = 1; i < entries.length; i++) {
    const prevCount = entries[i - 1][1];
    const currentCount = entries[i][1];
    if (prevCount !== 0) {
      const change = ((currentCount - prevCount) / prevCount) * 100;
      growthRates.push(change);
    }
  }

  const averageChange = growthRates.length
    ? growthRates.reduce((acc, curr) => acc + curr, 0) / growthRates.length
    : 0;

  const sortedGrowthRates = [...growthRates].sort((a, b) => a - b);
  const medianChange =
    sortedGrowthRates.length % 2 === 0
      ? (sortedGrowthRates[sortedGrowthRates.length / 2 - 1] +
          sortedGrowthRates[sortedGrowthRates.length / 2]) /
        2
      : sortedGrowthRates[Math.floor(sortedGrowthRates.length / 2)];

  const firstCount = entries[0][1];
  const lastCount = entries[entries.length - 1][1];
  const numberOfMonths = entries.length;
  const cagr =
    firstCount > 0
      ? (Math.pow(lastCount / firstCount, 1 / (numberOfMonths - 1)) - 1) * 100
      : 0;

  return {
    averageTrend: `${Math.round(averageChange * 10) / 10}%`,
    medianTrend: `${Math.round(medianChange * 10) / 10}%`,
    cagrTrend: `${Math.round(cagr * 10) / 10}%`,
  };
};
