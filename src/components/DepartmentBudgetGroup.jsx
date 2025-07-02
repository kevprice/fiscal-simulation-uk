import React from 'react';
import SliderGroup from './SliderGroup';

function DepartmentBudgetGroup({ departments, budgets, onChange }) {
  const sliders = Object.entries(departments).map(([name, dept]) => ({
    label: name,
    value: budgets[name],
    min: 0,
    max: dept.budget * 2,
    step: 1,
    baseline: dept.budget,
  }));

  const handleChange = (index, value) => {
    const deptNames = Object.keys(departments);
    const deptName = deptNames[index];
    onChange(deptName, value);
  };

  return (
    <div className="p-4">
      <h2 className="font-bold mb-2">Department Budgets</h2>
      <SliderGroup title="" sliders={sliders} onChange={handleChange} />
    </div>
  );
}

export default DepartmentBudgetGroup;
