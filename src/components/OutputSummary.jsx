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

  return (
    <div className="p-4 rounded-xl shadow bg-white space-y-2 fixed top-4 right-4 max-w-xs z-10">
      <h2 className="text-xl font-bold">Budget Summary - {year}</h2>
      <p>Total Revenue: £{totalRevenue.toFixed(1)}bn</p>
      <p>Total Spending: £{totalSpending.toFixed(1)}bn</p>
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
    </div>
  );
};

export default OutputSummary;
