import { spendingBaseline, revenueBaseline } from '../data/fiscalBaseline';
import { additionalBaseline } from '../data/additionalBaseline';
import { macroBaseline } from '../data/macroBaseline';

export function getLabourParticipation(spending) {
  const extraHealth = spending.health - spendingBaseline.health;
  const extraEducation = spending.education - spendingBaseline.education;
  const extraPensions = spending.pensions - spendingBaseline.pensions;
  const rate =
    additionalBaseline.labourParticipation +
    0.02 * extraHealth +
    0.015 * extraEducation -
    0.01 * extraPensions;
  return +rate.toFixed(2);
}

export function getProductivity(spending) {
  const extraInfra = spending.infrastructure - spendingBaseline.infrastructure;
  const extraScience = spending.science - spendingBaseline.science;
  const extraEducation = spending.education - spendingBaseline.education;
  const index =
    additionalBaseline.productivity +
    0.1 * extraInfra +
    0.1 * extraScience +
    0.05 * extraEducation;
  return +index.toFixed(2);
}

export function getInflationRate(deficit, gdpGain) {
  const rate =
    additionalBaseline.inflation +
    deficit * 0.0001 +
    gdpGain * 0.00005;
  return +rate.toFixed(3);
}

export function getInequality(spending, revenue) {
  const extraWelfare =
    (spending.unemployment - spendingBaseline.unemployment) +
    (spending.housingSupport - spendingBaseline.housingSupport);
  const vatChange = revenue.vat - revenueBaseline.vat;
  const rate =
    additionalBaseline.gini -
    0.0005 * extraWelfare +
    0.0001 * vatChange;
  return +rate.toFixed(3);
}

export function getCrimeRate(unemploymentRate, inequality, spending) {
  const extraPolicing = spending.homeOffice - spendingBaseline.homeOffice;
  const rate =
    additionalBaseline.crimeRate +
    (unemploymentRate - macroBaseline.unemploymentRate) * 2 +
    (inequality - additionalBaseline.gini) * 100 -
    0.1 * extraPolicing;
  return +rate.toFixed(1);
}

export function getLifeExpectancy(spending) {
  const extraHealth = spending.health - spendingBaseline.health;
  const extraEnvironment = spending.environment - spendingBaseline.environment;
  const expectancy =
    additionalBaseline.lifeExpectancy +
    0.02 * extraHealth +
    0.01 * extraEnvironment;
  return +expectancy.toFixed(2);
}

export function getEducationOutcome(spending) {
  const extraEducation = spending.education - spendingBaseline.education;
  const extraScience = spending.science - spendingBaseline.science;
  const index =
    additionalBaseline.educationIndex +
    0.05 * extraEducation +
    0.02 * extraScience;
  return +index.toFixed(3);
}

export function getEmissionsIndex(spending, revenue) {
  const extraEnvironment = spending.environment - spendingBaseline.environment;
  const fuelDutyChange = revenue.fuelDuty - revenueBaseline.fuelDuty;
  const index =
    additionalBaseline.emissionsIndex -
    0.05 * extraEnvironment -
    0.02 * fuelDutyChange;
  return +index.toFixed(1);
}
