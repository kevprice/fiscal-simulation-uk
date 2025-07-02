// src/utils/economics.js

// Laffer Curve: Models diminishing returns on high tax rates
export function lafferCurve(rate, maxRevenueRate = 0.6) {
  return rate * (1 - rate / maxRevenueRate);
}

// Keynesian GDP boost: Returns estimated GDP effect from increased spending
export function gdpBoostFromSpending(extraSpending, multiplier = 1.4) {
  return extraSpending * multiplier;
}

// Dynamic interest rate model based on total debt
export function getDynamicInterestRate(debt) {
  if (debt < 1000) return 0.02;
  if (debt < 2000) return 0.025;
  if (debt < 3000) return 0.03;
  return 0.04;
}
