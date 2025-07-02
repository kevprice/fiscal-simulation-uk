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
 * Returns a new adjusted state with updated revenue values based on spending.
 */
export function applyDependencies(state) {
  const newState = JSON.parse(JSON.stringify(state));

  const extraUnemp = newState.spending.unemployment - fiscalBaseline.spending.unemployment;
  const extraInfra = newState.spending.infrastructure - fiscalBaseline.spending.infrastructure;
  const extraEducation = newState.spending.education - fiscalBaseline.spending.education;
  const extraHealth = newState.spending.health - fiscalBaseline.spending.health;

  // --- GDP Boosts ---

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

  // --- Apply GDP Gains to Revenue ---
  // Simplified mapping of GDP growth into tax revenue boosts
  newState.revenue.incomeTax += totalGDPGain * 0.3;
  newState.revenue.vat += totalGDPGain * 0.2;
  newState.revenue.corporationTax += totalGDPGain * 0.1;

  // --- Laffer Curve Effect on Income Tax ---
  if (newState.sliderState?.incomeTaxRate !== undefined) {
    const taxRate = newState.sliderState.incomeTaxRate; // e.g. 0.45 = 45%
    const peakRevenue = 350; // Theoretical peak income tax revenue
    newState.revenue.incomeTax = lafferCurve(taxRate) * peakRevenue;
  }

  return newState;
}
