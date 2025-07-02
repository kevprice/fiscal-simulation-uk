import React from 'react';
import {
  getTotalRevenue,
  getTotalSpending,
  getDeficit,
  getDebtInterest,
} from '../utils/calculations';
import {
  getDynamicInterestRate,
  getUnemploymentRate,
  getNetMigration,
} from '../utils/economics';
import { macroBaseline } from '../data/macroBaseline';
import { calculateHappinessIndex } from '../utils/qualityOfLife';
import {
  getLabourParticipation,
  getProductivity,
  getInflationRate,
  getInequality,
  getCrimeRate,
  getLifeExpectancy,
  getEducationOutcome,
  getEmissionsIndex,
} from '../utils/additionalMetrics';

const OutputSummary = ({ revenue, spending, debt, year, deficit, gdpGain }) => {
  const totalRevenue = getTotalRevenue(revenue);
  const totalSpending = getTotalSpending(spending);
  const balance = deficit !== undefined ? deficit : getDeficit(revenue, spending);
  const rate = getDynamicInterestRate(debt, balance);
  const interest = getDebtInterest(debt, rate);
  const unemployment = getUnemploymentRate(
    macroBaseline.unemploymentRate,
    gdpGain || 0,
    macroBaseline.gdp
  );
  const migration = getNetMigration(
    macroBaseline.netMigration,
    gdpGain || 0,
    macroBaseline.gdp
  );
  const happiness = calculateHappinessIndex(spending);
  const participation = getLabourParticipation(spending);
  const productivity = getProductivity(spending);
  const inflation = getInflationRate(balance, gdpGain || 0);
  const inequality = getInequality(spending, revenue);
  const crime = getCrimeRate(unemployment, inequality, spending);
  const lifeExpectancy = getLifeExpectancy(spending);
  const educationIndex = getEducationOutcome(spending);
  const emissions = getEmissionsIndex(spending, revenue);
  const gdp = macroBaseline.gdp + (gdpGain || 0);
  const growthRate = ((gdpGain || 0) / macroBaseline.gdp) * 100;

  return (
    <div className="p-4 rounded-xl shadow bg-white space-y-2">
      <h2 className="text-xl font-bold">Budget Summary - {year}</h2>
      <p>Total Revenue: £{totalRevenue.toFixed(1)}bn</p>
      <p>Total Spending: £{totalSpending.toFixed(1)}bn</p>
      <p>GDP: £{gdp.toFixed(1)}bn</p>
      {gdpGain !== undefined && (
        <p className="text-xs text-gray-700">
          GDP change from fiscal policy: £{gdpGain.toFixed(1)}bn
        </p>
      )}
      <p>
        {balance >= 0
          ? `Surplus: £${balance.toFixed(1)}bn`
          : `Deficit: £${(-balance).toFixed(1)}bn`}
      </p>
      <p>Cumulative Debt: £{debt.toFixed(1)}bn</p>
      <p>Interest Rate: {(rate * 100).toFixed(2)}%</p>
      <p>Debt Interest: £{interest.toFixed(1)}bn</p>
      <p>Unemployment Rate: {unemployment.toFixed(1)}%</p>
      <p>Net Migration: {migration.toFixed(2)}m</p>
      <p>Happiness Index: {happiness}/10</p>
      <p>Economic Growth: {growthRate.toFixed(2)}%</p>
      <p>Labour Participation: {participation.toFixed(1)}%</p>
      <p>Productivity Index: {productivity.toFixed(1)}</p>
      <p>Inflation Rate: {(inflation * 100).toFixed(2)}%</p>
      <p>Inequality (Gini): {inequality.toFixed(3)}</p>
      <p>Crime Rate: {crime.toFixed(1)}</p>
      <p>Life Expectancy: {lifeExpectancy.toFixed(1)} years</p>
      <p>Education Index: {educationIndex.toFixed(2)}</p>
      <p>Emissions Index: {emissions.toFixed(1)}</p>
    </div>
  );
};

export default OutputSummary;
