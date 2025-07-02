import React from 'react';
import {
  getTotalRevenue,
  getTotalSpending,
  getDeficit,
  getDebtInterest,
} from '../utils/calculations';
import { getDynamicInterestRate } from '../utils/economics';
import { calculateHappinessIndex } from '../utils/qualityOfLife';

const OutputSummary = ({ revenue, spending, debt, year }) => {
  const totalRevenue = getTotalRevenue(revenue);
  const totalSpending = getTotalSpending(spending);
  const deficit = getDeficit(revenue, spending);
  const rate = getDynamicInterestRate(debt);
  const interest = getDebtInterest(debt, rate);
  const happiness = calculateHappinessIndex(spending);

  return (
    <div className="p-4 rounded-xl shadow bg-white space-y-2">
      <h2 className="text-xl font-bold">Budget Summary - {year}</h2>
      <p>Total Revenue: £{totalRevenue.toFixed(1)}bn</p>
      <p>Total Spending: £{totalSpending.toFixed(1)}bn</p>
      <p>
        {deficit >= 0
          ? `Surplus: £${deficit.toFixed(1)}bn`
          : `Deficit: £${(-deficit).toFixed(1)}bn`}
      </p>
      <p>Cumulative Debt: £{debt.toFixed(1)}bn</p>
      <p>Interest Rate: {(rate * 100).toFixed(2)}%</p>
      <p>Debt Interest: £{interest.toFixed(1)}bn</p>
      <p>Happiness Index: {happiness}/10</p>
    </div>
  );
};

export default OutputSummary;
