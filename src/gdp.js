function calculateGDPPercentile(regionGDP, data) {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('Data must be a non-empty array');
  }
  const sorted = data.slice().sort((a, b) => a - b);
  let less = 0;
  let equal = 0;
  for (const val of sorted) {
    if (val < regionGDP) {
      less++;
    } else if (val === regionGDP) {
      equal++;
    }
  }
  const percentile = ((less + equal * 0.5) / data.length) * 100;
  return percentile;
}

module.exports = { calculateGDPPercentile };
