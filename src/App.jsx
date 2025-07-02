import React, { useState } from 'react';
import SliderGroup from './components/SliderGroup';
import OutputSummary from './components/OutputSummary';
import ChartDisplay from './components/ChartDisplay';
import { revenueBaseline, spendingBaseline } from './data/fiscalBaseline';
import { calculateTotals } from './utils/calculations';
import { applyDependencies } from './utils/dependencyModel';

function App() {
  const [revenue, setRevenue] = useState(revenueBaseline);
  const [spending, setSpending] = useState(spendingBaseline);

  const adjustedState = applyDependencies({ revenue, spending });
  const totals = calculateTotals(adjustedState.revenue, adjustedState.spending);

  const handleRevenueChange = (index, value) => {
    const keys = Object.keys(revenue);
    const updated = { ...revenue, [keys[index]]: value };
    setRevenue(updated);
  };

  const handleSpendingChange = (index, value) => {
    const keys = Object.keys(spending);
    const updated = { ...spending, [keys[index]]: value };
    setSpending(updated);
  };

  const revenueSliders = Object.keys(revenue).map((key) => ({
    label: key,
    value: revenue[key],
    min: 0,
    max: revenueBaseline[key] * 2,
    step: 1,
  }));

  const spendingSliders = Object.keys(spending).map((key) => ({
    label: key,
    value: spending[key],
    min: 0,
    max: spendingBaseline[key] * 2,
    step: 1,
    disabled: key === 'pensions',
  }));

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">UK Budget Simulator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SliderGroup
          title="Revenue"
          sliders={revenueSliders}
          onChange={handleRevenueChange}
        />
        <SliderGroup
          title="Spending"
          sliders={spendingSliders}
          onChange={handleSpendingChange}
        />
      </div>
      <OutputSummary totals={totals} />
      <ChartDisplay />
    </div>
  );
}

export default App;
