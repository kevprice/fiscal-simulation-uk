import { lafferCurve, gdpBoostFromSpending } from './economics';
import { fiscalBaseline } from '../data/fiscalBaseline';

// Main function to apply dependency effects between sliders
export function applyDependencies(state) {
  const newState = JSON.parse(JSON.stringify(state)); // Deep clone for safety

  // Example: Keynesian GDP boost from infrastructure
  const extraInfra =
    newState.spending.infrastructure - fiscalBaseline.spending.infrastructure;
  if (extraInfra > 0) {
    const gdpBoost = gdpBoostFromSpending(extraInfra);

    // Apply simplified GDP effect to VAT and income tax
    newState.revenue.vat += gdpBoost * 0.5;
    newState.revenue.incomeTax += gdpBoost * 0.3;
  }

  // Example: Laffer Curve effect on income tax revenue
  const taxRate = newState.sliderState?.incomeTaxRate || 0.45; // e.g. 0.45 = 45%
  const estimatedMax = 350; // theoretical max revenue at optimal rate
  newState.revenue.incomeTax = lafferCurve(taxRate) * estimatedMax;

  // Employment penalty: higher unemployment spending reduces income tax revenue
  const extraUnemployment =
    newState.spending.unemployment - fiscalBaseline.spending.unemployment;
  if (extraUnemployment > 0) {
    const penalty = extraUnemployment * 0.2;
    newState.revenue.incomeTax = Math.max(
      0,
      newState.revenue.incomeTax - penalty
    );
  }

  return newState;
}
