// src/utils/dependencyModel.js

import {
  lafferCurve,
  unemploymentGDPBoost,
  infrastructureGDPBoost,
  educationGDPBoost,
  healthGDPBoost
} from './economics';

import { fiscalBaseline } from '../data/fiscalBaseline';

/**
 * Applies interdependencies and macroeconomic effects based on fiscal changes.
 * Returns a new adjusted state with updated revenue values.
 */
export function applyDependencies(state) {
  const newState = JSON.parse(JSON.stringify(state));

  const extraUnemp = newState.spending.unemployment - fiscalBaseline.spending.unemployment;
  const extraInfra = newState.spending.infrastructure - fiscalBaseline.spending.infrastructure;
  const extraEducation = newState.spending.education - fiscalBaseline.spending.education;
  const extraHealth = newState.spending.health - fiscalBaseline.spending.health;

  // --- GDP Boosts from Spending ---
  let totalGDPGain = 0;

  if (extraUnemp > 0) {
    totalGDPGain += unemploymentGDPBoost(extraUnemp); // IMF 2014
  }

  if (extraInfra > 0) {
    totalGDPGain += infrastructureGDPBoost(extraInfra); // OECD 2016
  }

  if (extraEducation > 0) {
    totalGDPGain += educationGDPBoost(extraEducation); // Hanushek & Woessmann 2015
  }

  if (extraHealth > 0) {
    totalGDPGain += healthGDPBoost(extraHealth); // WHO/Bloom 2008
  }

  // --- Base Income Tax from Laffer Curve ---
  if (newState.sliderState?.incomeTaxRate !== undefined) {
    const taxRate = newState.sliderState.incomeTaxRate; // e.g. 0.45 = 45%
    const peakRevenue = 350;

    const baseIncomeTax = lafferCurve(taxRate, 0.6) * peakRevenue;
    const incomeTaxBoost = totalGDPGain * 0.3;

    newState.revenue.incomeTax = baseIncomeTax + incomeTaxBoost;
  }

  // --- Other Taxes Boosted by GDP ---
  newState.revenue.vat += totalGDPGain * 0.2;
  newState.revenue.corporationTax += totalGDPGain * 0.1;

  return newState;
}
