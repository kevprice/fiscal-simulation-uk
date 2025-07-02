import { revenueBaseline, spendingBaseline } from '../data/fiscalBaseline';

export const dependencyModel = {
  baselineInfrastructure: spendingBaseline.infrastructure,
  baselineUnemployment: spendingBaseline.unemployment,
  gdpBoostPerInfrastructure: 0.1,
  gdpVatMultiplier: 0.6,
  employmentPenaltyRate: 0.2,
};
