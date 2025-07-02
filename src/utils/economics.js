// src/utils/economics.js

// Laffer Curve: diminishing returns on high tax rates.
// Source: Diamond & Saez (2011) - JEP Optimal Taxation
export function lafferCurve(rate, maxRevenueRate = 0.6) {
  return rate * (1 - rate / maxRevenueRate);
}

// GDP boost from additional unemployment spending.
// Multiplier ~1.0-1.6 (IMF 2014 - Fiscal Multipliers)
export function unemploymentGDPBoost(extraUnempSpending) {
  const multiplier = 1.3; // conservative midpoint
  return extraUnempSpending * multiplier;
}

// GDP boost from infrastructure spending.
// Multiplier ~1.5-2.5 (OECD 2016 - Infrastructure and Growth)
export function infrastructureGDPBoost(extraInfraSpending) {
  const multiplier = 2.0;
  return extraInfraSpending * multiplier;
}

// Keynesian GDP boost: generic spending multiplier
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
