// src/utils/economics.js

/**
 * Economics utility functions used for fiscal simulation.
 * All outputs are in £bn.
 * Sources for multipliers and logic are documented inline.
 */

/**
 * Laffer Curve Model
 * Models diminishing returns on tax rates beyond an optimal point (~60%)
 * Source: Diamond & Saez (2011), Journal of Economic Perspectives
 * https://eml.berkeley.edu/~saez/diamond-saezJEP11opttax.pdf
 */
export function lafferCurve(rate, maxRevenueRate = 0.6) {
  return rate * (1 - rate / maxRevenueRate);
}

/**
 * Unemployment Benefit Multiplier
 * Spending on unemployment benefits increases GDP through consumer demand.
 * Multiplier estimated between 1.0 and 1.6.
 * Source: IMF (2014) – Fiscal Multipliers
 * https://www.imf.org/external/pubs/ft/spn/2014/spn1402.pdf
 */
export function unemploymentGDPBoost(extraUnempSpending, multiplier = 1.3) {
  return extraUnempSpending * multiplier;
}

/**
 * Infrastructure Investment Multiplier
 * Capital investment has long-term GDP benefits through productivity & employment.
 * Estimated multipliers range from 1.5 to 2.5.
 * Source: OECD (2016) – Infrastructure investment and growth
 * https://www.oecd.org/economy/growth/Infrastructure-investment-and-growth.pdf
 */
export function infrastructureGDPBoost(extraInfraSpending, multiplier = 2.0) {
  return extraInfraSpending * multiplier;
}

/**
 * Education Spending Returns
 * Estimated long-term GDP return from increased education investment.
 * Source: Hanushek & Woessmann (2015) – The Knowledge Capital of Nations
 * https://mitpress.mit.edu/9780262029179/
 */
export function educationGDPBoost(extraEducationSpending, multiplier = 1.8) {
  return extraEducationSpending * multiplier;
}

/**
 * NHS (Health) Spending Productivity Effect
 * Better health increases labour force participation and productivity.
 * Estimated return: 1.2–1.5 GDP multiplier.
 * Source: WHO (2001), Bloom & Canning (2008)
 */
export function healthGDPBoost(extraHealthSpending, multiplier = 1.3) {
  return extraHealthSpending * multiplier;
}

/**
 * Dynamic Interest Rate Model
 * As national debt increases, so does risk and interest burden.
 * These thresholds are illustrative, not predictive.
 */
export function getDynamicInterestRate(debt) {
  if (debt < 1000) return 0.02;
  if (debt < 2000) return 0.025;
  if (debt < 3000) return 0.03;
  return 0.04;
}
