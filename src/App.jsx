import React, { useState } from 'react';
import SliderGroup from './components/SliderGroup';
import DepartmentGroup from './components/DepartmentGroup';
import OutputSummary from './components/OutputSummary';
import ChartDisplay from './components/ChartDisplay';
import HistoryChart from './components/HistoryChart';
import { revenueBaseline, spendingBaseline } from './data/fiscalBaseline';
import { departmentBudgets } from './data/departmentBudgets';
import {
  getTotalRevenue,
  getTotalSpending,
} from './utils/calculations';
import { applyDependencies } from './utils/dependencyModel';

function App() {
  const [revenue, setRevenue] = useState(revenueBaseline);
  const [spending, setSpending] = useState(spendingBaseline);
  const [year, setYear] = useState(2024);
  const [debt, setDebt] = useState(2000); // Starting national debt in £bn
  const [history, setHistory] = useState([
    {
      year: 2024,
      revenue: getTotalRevenue(revenueBaseline),
      spending: getTotalSpending(spendingBaseline),
      debt: 2000,
    },
  ]);

  const adjustedState = applyDependencies({ revenue, spending });

  const simulateNextYear = () => {
    const adjusted = applyDependencies({ revenue, spending });
    const totalRevenue = getTotalRevenue(adjusted.revenue);
    const totalSpending = getTotalSpending(adjusted.spending);
    const deficit = totalRevenue - totalSpending;
    const updatedDebt = debt + (deficit < 0 ? -deficit : 0);

    setHistory((prev) => [
      ...prev,
      {
        year: year + 1,
        revenue: totalRevenue,
        spending: totalSpending,
        debt: updatedDebt,
      },
    ]);

    setDebt(updatedDebt);
    setYear((prev) => prev + 1);
  };

  const handleReset = () => {
    setRevenue(revenueBaseline);
    setSpending(spendingBaseline);
    setYear(2024);
    setDebt(2000);
    setHistory([
      {
        year: 2024,
        revenue: getTotalRevenue(revenueBaseline),
        spending: getTotalSpending(spendingBaseline),
        debt: 2000,
      },
    ]);
  };

  const handleRevenueChange = (index, value) => {
    const keys = Object.keys(revenue);
    const updated = { ...revenue, [keys[index]]: value };
    setRevenue(updated);
  };

  const handleSpendingChange = (category, value) => {
    const updated = { ...spending, [category]: value };
    setSpending(updated);
  };

  const revenueSliders = Object.keys(revenue).map((key) => ({
    label: key,
    value: adjustedState.revenue[key],
    min: 0,
    max: revenueBaseline[key] * 2,
    step: 1,
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
        <DepartmentGroup
          departments={departmentBudgets}
          spending={spending}
          onChange={handleSpendingChange}
        />
      </div>
      <OutputSummary
        revenue={adjustedState.revenue}
        spending={adjustedState.spending}
        debt={debt}
        year={year}
      />
      <div className="flex space-x-2 mt-4">
        <button
          onClick={simulateNextYear}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Simulate Next Year
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Reset
        </button>
      </div>
      <ChartDisplay />
      <HistoryChart history={history} />
    </div>
  );
}

export default App;
