import {
  lafferCurve,
  unemploymentGDPBoost,
  infrastructureGDPBoost,
} from './economics';
import { fiscalBaseline } from '../data/fiscalBaseline';

// Main function to apply dependency effects between sliders
export function applyDependencies(state) {
  const newState = JSON.parse(JSON.stringify(state)); // Deep clone for safety

  // GDP boost from additional unemployment support
  const extraUnemp =
    newState.spending.unemployment - fiscalBaseline.spending.unemployment;
  if (extraUnemp > 0) {
    const gdpGain = unemploymentGDPBoost(extraUnemp);
    newState.revenue.incomeTax += gdpGain * 0.25;
    newState.revenue.vat += gdpGain * 0.15;
  }

  // GDP boost from infrastructure spending
  const extraInfra =
    newState.spending.infrastructure - fiscalBaseline.spending.infrastructure;
  if (extraInfra > 0) {
    const gdpGain = infrastructureGDPBoost(extraInfra);
    newState.revenue.incomeTax += gdpGain * 0.3;
    newState.revenue.vat += gdpGain * 0.2;
  }

  // Laffer Curve effect on income tax revenue
  const taxRate = newState.sliderState?.incomeTaxRate || 0.45;
  newState.revenue.incomeTax = lafferCurve(taxRate) * 350;

  return newState;
}
