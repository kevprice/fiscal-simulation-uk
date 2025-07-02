const assert = require('assert');
const { calculateGDPPercentile } = require('../src/gdp');

function nearlyEqual(a, b, tolerance = 1e-6) {
  return Math.abs(a - b) <= tolerance;
}

const gdpData = [20000, 25000, 30000, 35000];
const nationalAverage = gdpData.reduce((a, b) => a + b, 0) / gdpData.length;

assert(nearlyEqual(calculateGDPPercentile(20000, gdpData), 12.5));
assert(nearlyEqual(calculateGDPPercentile(25000, gdpData), 37.5));
assert(nearlyEqual(calculateGDPPercentile(30000, gdpData), 62.5));
assert(nearlyEqual(calculateGDPPercentile(35000, gdpData), 87.5));

assert(nearlyEqual(calculateGDPPercentile(nationalAverage, gdpData), 50));

console.log('All tests passed.');
