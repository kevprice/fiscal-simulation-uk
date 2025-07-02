import { spendingBaseline } from '../data/fiscalBaseline';
import { happinessBaseline } from '../data/happinessIndex';
import { departmentBudgets } from '../data/departmentBudgets';

export function calculateHappinessIndex(spending) {
  let weightedSum = 0;
  let totalWeight = 0;

  for (const [dept, { categories, weight }] of Object.entries(departmentBudgets)) {
    let baselineTotal = 0;
    let currentTotal = 0;
    for (const category of Object.keys(categories)) {
      baselineTotal += spendingBaseline[category] || 0;
      currentTotal += spending[category] || 0;
    }
    const ratio = baselineTotal === 0 ? 1 : currentTotal / baselineTotal;
    weightedSum += ratio * weight;
    totalWeight += weight;
  }

  if (totalWeight === 0) {
    return happinessBaseline.happiness;
  }

  const index = happinessBaseline.happiness * (weightedSum / totalWeight);
  return +index.toFixed(2);
}
