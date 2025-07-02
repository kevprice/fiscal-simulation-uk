import React, { useState } from 'react';
import SliderGroup from './components/SliderGroup';
import DepartmentBudgetGroup from './components/DepartmentBudgetGroup';
import DepartmentGroup from './components/DepartmentGroup';
import OutputSummary from './components/OutputSummary';
import SourceCitations from './components/SourceCitations';
import BaselineKey from './components/BaselineKey';
import ChartDisplay from './components/ChartDisplay';
import HistoryChart from './components/HistoryChart';
import { revenueBaseline, spendingBaseline } from './data/fiscalBaseline';
import { macroBaseline } from './data/macroBaseline';
import { departmentBudgets } from './data/departmentBudgets';
import { revenueInfo } from './data/infoText';
import {
  getTotalRevenue,
  getTotalSpending,
  getDeficit,
} from './utils/calculations';
import { applyDependencies } from './utils/dependencyModel';
import {
  getDynamicInterestRate,
  getUnemploymentRate,
} from './utils/economics';
import { calculateHappinessIndex } from './utils/qualityOfLife';

function App() {
  const [revenue, setRevenue] = useState(revenueBaseline);
  const [spending, setSpending] = useState(spendingBaseline);
  const initialBudgets = Object.fromEntries(
    Object.entries(departmentBudgets).map(([name, dept]) => [name, dept.budget])
  );
  const [budgets, setBudgets] = useState(initialBudgets);
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
  const deficitCurrent = getDeficit(adjustedState.revenue, adjustedState.spending);
  const interestRate = getDynamicInterestRate(debt, deficitCurrent);
  const unemploymentRate = getUnemploymentRate(
    macroBaseline.unemploymentRate,
    adjustedState.gdpGain || 0,
    macroBaseline.gdp
  );
  const happiness = calculateHappinessIndex(adjustedState.spending);

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
    setBudgets(initialBudgets);
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
    const key = keys[index];
    const updated = { ...revenue, [key]: value };
    setRevenue(updated);
  };

  const handleBudgetChange = (deptName, value) => {
    setBudgets((prev) => ({ ...prev, [deptName]: value }));
    const categories = Object.keys(departmentBudgets[deptName].categories);
    const currentTotal = categories.reduce(
      (sum, key) => sum + (spending[key] || 0),
      0
    );
    if (value < currentTotal && currentTotal > 0) {
      const ratio = value / currentTotal;
      const updatedSpending = { ...spending };
      categories.forEach((key) => {
        updatedSpending[key] = +(spending[key] * ratio).toFixed(1);
      });
      setSpending(updatedSpending);
      return;
    }
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
    baseline: revenueBaseline[key],
    info: revenueInfo[key],
  }));

  const departmentsWithBudgets = Object.fromEntries(
    Object.entries(departmentBudgets).map(([name, dept]) => [
      name,
      { ...dept, budget: budgets[name] },
    ])
  );


  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">UK Budget Simulator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SliderGroup
          title="Revenue"
          sliders={revenueSliders}
          onChange={handleRevenueChange}
        />
        <DepartmentBudgetGroup
          departments={departmentBudgets}
          budgets={budgets}
          onChange={handleBudgetChange}
        />
      </div>
      <DepartmentGroup
        departments={departmentsWithBudgets}
        spending={spending}
        onChange={handleSpendingChange}
      />
      <div className="fixed top-4 right-10 max-w-xs z-10 space-y-2">
        <OutputSummary
          revenue={adjustedState.revenue}
          spending={adjustedState.spending}
          debt={debt}
          year={year}
          deficit={deficitCurrent}
          gdpGain={adjustedState.gdpGain}
        />
      </div>
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
      <BaselineKey />
      <SourceCitations />
    </div>
  );
}

export default App;
