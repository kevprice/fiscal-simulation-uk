import React, { useState } from 'react';
import SliderGroup from './components/SliderGroup';
import DepartmentBudgetGroup from './components/DepartmentBudgetGroup';
import DepartmentGroup from './components/DepartmentGroup';
import OutputSummary from './components/OutputSummary';
import SourceCitations from './components/SourceCitations';
import BaselineKey from './components/BaselineKey';
import InfoBox from './components/InfoBox';
import ChartDisplay from './components/ChartDisplay';
import HistoryChart from './components/HistoryChart';
import { revenueBaseline, spendingBaseline } from './data/fiscalBaseline';
import { macroBaseline } from './data/macroBaseline';
import { departmentBudgets } from './data/departmentBudgets';
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

const defaultInfo =
  'This simulator uses baseline figures from the Office for Budget Responsibility\'s March 2024 Public Finances databank. Department budgets are mapped from the same source. Spending multipliers and other assumptions are documented in src/data/assumptions.js.';

const revenueInfo = {
  incomeTax:
    'Income tax revenue. Increasing this slider raises total revenue. Baseline from OBR 2024.',
  nationalInsurance:
    'National Insurance contributions. Baseline from OBR 2024.',
  vat: 'Value Added Tax receipts based on OBR 2024.',
  corporationTax: 'Corporation tax revenue.',
  fuelDuty: 'Fuel duty receipts.',
  alcoholDuty: 'Alcohol duty receipts.',
  tobaccoDuty: 'Tobacco duty receipts.',
  other: 'Other government revenue.',
};

const spendingInfo = {
  unemployment:
    'Unemployment benefits. Extra spending boosts GDP using a 1.3 multiplier (IMF 2014), which increases tax revenues.',
  infrastructure:
    'Infrastructure investment. Extra spending boosts GDP with a multiplier around 2.0 (OECD 2016).',
  education:
    'Education spending. Higher funding improves long‑term GDP (Hanushek & Woessmann 2015).',
  health:
    'Health/NHS budget. Increased spending can raise productivity with a ~1.3 multiplier (WHO/Bloom 2008).',
};

const budgetInfo = {
  'Department of Health and Social Care':
    'Sets the overall health budget. Lowering it scales the health category down proportionally.',
  'Department for Education':
    'Controls the education budget. Reducing it shrinks education spending.',
  'Ministry of Defence': 'Total defence budget.',
  'Department for Work and Pensions':
    'Welfare budget covering unemployment, disability and pensions. Reduced budgets scale those categories.',
  'Housing and Local Government':
    'Budget for housing support and grants to local government.',
  'Infrastructure and Transport': 'Infrastructure and transport budget.',
};

function App() {
  const [revenue, setRevenue] = useState(revenueBaseline);
  const [spending, setSpending] = useState(spendingBaseline);
  const initialBudgets = Object.fromEntries(
    Object.entries(departmentBudgets).map(([name, dept]) => [name, dept.budget])
  );
  const [budgets, setBudgets] = useState(initialBudgets);
  const [year, setYear] = useState(2024);
  const [debt, setDebt] = useState(2000); // Starting national debt in £bn
  const [infoText, setInfoText] = useState(defaultInfo);
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
    setInfoText(defaultInfo);
  };

  const handleRevenueChange = (index, value) => {
    const keys = Object.keys(revenue);
    const key = keys[index];
    const updated = { ...revenue, [key]: value };
    setRevenue(updated);
    const desc = revenueInfo[key] || `${key} revenue.`;
    setInfoText(`${desc} Set to £${value}bn.`);
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
      const desc = budgetInfo[deptName] || `${deptName} budget.`;
      setInfoText(`${desc} Reduced to £${value}bn and category spend scaled.`);
      return;
    }
    const desc = budgetInfo[deptName] || `${deptName} budget.`;
    setInfoText(`${desc} Set to £${value}bn.`);
  };

  const handleSpendingChange = (category, value) => {
    const updated = { ...spending, [category]: value };
    setSpending(updated);
    const desc = spendingInfo[category] || `${category} spending.`;
    setInfoText(`${desc} Set to £${value}bn.`);
  };

  const revenueSliders = Object.keys(revenue).map((key) => ({
    label: key,
    value: adjustedState.revenue[key],
    min: 0,
    max: revenueBaseline[key] * 2,
    step: 1,
    baseline: revenueBaseline[key],
  }));

  const departmentsWithBudgets = Object.fromEntries(
    Object.entries(departmentBudgets).map(([name, dept]) => [
      name,
      { ...dept, budget: budgets[name] },
    ])
  );


  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">UK Budget Simulator</h1>
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
      <div className="fixed top-4 right-4 max-w-xs z-10 space-y-2">
        <OutputSummary
          revenue={adjustedState.revenue}
          spending={adjustedState.spending}
          debt={debt}
          year={year}
          deficit={deficitCurrent}
          gdpGain={adjustedState.gdpGain}
        />
        <InfoBox
          text={infoText}
          happiness={happiness}
          interestRate={interestRate}
          unemploymentRate={unemploymentRate}
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
