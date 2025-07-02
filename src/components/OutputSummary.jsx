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

const summaryInfo = {
  revenue: 'Sum of all revenue categories.',
  spending: 'Combined value of all spending categories.',
  gdp: 'Gross domestic product after policy changes.',
  gdpChange: 'Change in GDP resulting from your fiscal policy.',
  balance: 'Difference between revenue and spending.',
  debt: 'Existing national debt plus new borrowing.',
  interestRate: 'Estimated borrowing cost based on debt levels.',
  interest: 'Annual cost of servicing the national debt.',
  unemployment: 'Projected unemployment after policy.',
  migration: 'Estimated net migration.',
  happiness: 'Quality of life score weighted by spending.',
  growth: 'Annual economic growth rate.',
  participation: 'Share of working-age people employed.',
  productivity: 'Output per worker relative to baseline.',
  inflation: 'Estimated price growth from policy.',
  inequality: 'Income inequality measured by the Gini coefficient.',
  crime: 'Crime index influenced by unemployment and inequality.',
  life: 'Average life expectancy.',
  education: 'Education outcomes index.',
  emissions: 'Carbon emissions relative to baseline.',
};

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
    <div className="p-4 rounded-xl shadow bg-white space-y-2 text-sm">
      <h2 className="text-lg font-bold">Budget Summary - {year}</h2>
      <p>
        Total Revenue: £{totalRevenue.toFixed(1)}bn
        <span className="ml-1 text-blue-600 cursor-help" title={summaryInfo.revenue}>?</span>
      </p>
      <p>
        Total Spending: £{totalSpending.toFixed(1)}bn
        <span className="ml-1 text-blue-600 cursor-help" title={summaryInfo.spending}>?</span>
      </p>
      <p>
        GDP: £{gdp.toFixed(1)}bn
        <span className="ml-1 text-blue-600 cursor-help" title={summaryInfo.gdp}>?</span>
      </p>
      {gdpGain !== undefined && (
        <p className="text-xs text-gray-700">
          GDP change from fiscal policy: £{gdpGain.toFixed(1)}bn
          <span className="ml-1 text-blue-600 cursor-help" title={summaryInfo.gdpChange}>?</span>
        </p>
      )}
      <p>
        {balance >= 0
          ? `Surplus: £${balance.toFixed(1)}bn`
          : `Deficit: £${(-balance).toFixed(1)}bn`}
        <span className="ml-1 text-blue-600 cursor-help" title={summaryInfo.balance}>?</span>
      </p>
      <p>
        Cumulative Debt: £{debt.toFixed(1)}bn
        <span className="ml-1 text-blue-600 cursor-help" title={summaryInfo.debt}>?</span>
      </p>
      <p>
        Interest Rate: {(rate * 100).toFixed(2)}%
        <span className="ml-1 text-blue-600 cursor-help" title={summaryInfo.interestRate}>?</span>
      </p>
      <p>
        Debt Interest: £{interest.toFixed(1)}bn
        <span className="ml-1 text-blue-600 cursor-help" title={summaryInfo.interest}>?</span>
      </p>
      <p>
        Unemployment Rate: {unemployment.toFixed(1)}%
        <span className="ml-1 text-blue-600 cursor-help" title={summaryInfo.unemployment}>?</span>
      </p>
      <p>
        Net Migration: {migration.toFixed(2)}m
        <span className="ml-1 text-blue-600 cursor-help" title={summaryInfo.migration}>?</span>
      </p>
      <p>
        Happiness Index: {happiness}/10
        <span className="ml-1 text-blue-600 cursor-help" title={summaryInfo.happiness}>?</span>
      </p>
      <p>
        Economic Growth: {growthRate.toFixed(2)}%
        <span className="ml-1 text-blue-600 cursor-help" title={summaryInfo.growth}>?</span>
      </p>
      <p>
        Labour Participation: {participation.toFixed(1)}%
        <span className="ml-1 text-blue-600 cursor-help" title={summaryInfo.participation}>?</span>
      </p>
      <p>
        Productivity Index: {productivity.toFixed(1)}
        <span className="ml-1 text-blue-600 cursor-help" title={summaryInfo.productivity}>?</span>
      </p>
      <p>
        Inflation Rate: {(inflation * 100).toFixed(2)}%
        <span className="ml-1 text-blue-600 cursor-help" title={summaryInfo.inflation}>?</span>
      </p>
      <p>
        Inequality (Gini): {inequality.toFixed(3)}
        <span className="ml-1 text-blue-600 cursor-help" title={summaryInfo.inequality}>?</span>
      </p>
      <p>
        Crime Rate: {crime.toFixed(1)}
        <span className="ml-1 text-blue-600 cursor-help" title={summaryInfo.crime}>?</span>
      </p>
      <p>
        Life Expectancy: {lifeExpectancy.toFixed(1)} years
        <span className="ml-1 text-blue-600 cursor-help" title={summaryInfo.life}>?</span>
      </p>
      <p>
        Education Index: {educationIndex.toFixed(2)}
        <span className="ml-1 text-blue-600 cursor-help" title={summaryInfo.education}>?</span>
      </p>
      <p>
        Emissions Index: {emissions.toFixed(1)}
        <span className="ml-1 text-blue-600 cursor-help" title={summaryInfo.emissions}>?</span>
      </p>
    </div>
  );
};

export default OutputSummary;
