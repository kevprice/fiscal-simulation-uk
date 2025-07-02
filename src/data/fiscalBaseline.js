// Baseline figures use the OBR March 2024 forecast (approximate £bn)
// Source: Office for Budget Responsibility - Public finances databank
// https://obr.uk/data/
import { revenue2024, spending2024 } from './obr2024Budget';

export const revenueBaseline = revenue2024;

export const spendingBaseline = spending2024;

export const fiscalBaseline = {
  revenue: revenueBaseline,
  spending: spendingBaseline,
};
