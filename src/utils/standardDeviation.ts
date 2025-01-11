interface standardDeviationType {
  price: number;
}

export const calculateStandardDeviation = (
  values: standardDeviationType[]
): number => {
  const n = values.length;
  if (n === 0) return 0;

  const mean = values.reduce((acc, value) => acc + value.price, 0) / n;
  const squaredDiffs = values.map((value) => Math.pow(value.price - mean, 2));
  const avgSquaredDiff = squaredDiffs.reduce((acc, diff) => acc + diff, 0) / n;

  console.log("Math.sqrt(avgSquaredDiff)", Math.sqrt(avgSquaredDiff));
  return Math.sqrt(avgSquaredDiff);
};
