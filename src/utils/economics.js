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
 * Dynamic Interest Rate Model with deficit impact
 * Higher deficits can push interest rates up through crowding-out effects.
 * See Gale & Orszag (2003) - Economic Effects of Sustained Budget Deficits.
 */
export function getDynamicInterestRate(debt, deficit = 0) {
  let base;
  if (debt < 1000) base = 0.02;
  else if (debt < 2000) base = 0.025;
  else if (debt < 3000) base = 0.03;
  else base = 0.04;

  // Add 0.01 percentage points for each £100bn of deficit
  const deficitAdj = Math.max(0, deficit) * 0.0001;
  return base + deficitAdj;
}

/**
 * Unemployment response via Okun's Law.
 * Roughly 1% extra GDP growth reduces unemployment by about 0.3ppt.
 * Source: Okun (1962) - Potential GNP: Its Measurement and Significance.
 */
export function getUnemploymentRate(
  baseRate,
  gdpGain,
  baselineGDP,
  okunCoeff = 0.3
) {
  const gdpGrowth = gdpGain / baselineGDP;
  const delta = -okunCoeff * gdpGrowth * 100;
  return +(baseRate + delta).toFixed(2);
}

/**
 * Simple immigration elasticity to economic growth.
 * Empirical studies suggest positive correlation between GDP growth and net migration.
 * Elasticity assumed at 0.1 for demonstration (ONS migration data).
 */
export function getNetMigration(
  baseMigration,
  gdpGain,
  baselineGDP,
  elasticity = 0.1
) {
  const gdpGrowth = gdpGain / baselineGDP;
  return +(baseMigration * (1 + elasticity * gdpGrowth)).toFixed(2);
}
