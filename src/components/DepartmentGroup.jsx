import React from 'react';
import SliderGroup from './SliderGroup';

function DepartmentGroup({ departments, spending, onChange }) {
  return (
    <div className="space-y-4">
      {Object.entries(departments).map(([deptName, dept]) => {
        const categories = dept.categories;
        const budget = dept.budget;

        const spent = Object.keys(categories).reduce(
          (sum, key) => sum + (spending[key] || 0),
          0
        );

        const sliders = Object.keys(categories).map((key) => {
          const otherTotal = spent - (spending[key] || 0);
          let max = categories[key] * 2;
          if (budget !== undefined) {
            max = Math.min(
              Math.max(spending[key], budget - otherTotal),
              categories[key] * 2
            );
          }
          return {
            label: key,
            value: spending[key],
            min: 0,
            max,
            step: 1,
          };
        });

        const handleChange = (index, value) => {
          const keys = Object.keys(categories);
          const key = keys[index];
          const otherTotal = spent - (spending[key] || 0);
          let newValue = value;
          if (budget !== undefined) {
            const maxAllowed = budget - otherTotal;
            newValue = Math.min(value, maxAllowed);
          }
          onChange(key, newValue);
        };

        return (
          <div key={deptName} className="border rounded p-2 bg-gray-50">
            <h3 className="font-semibold mb-2">{deptName}</h3>
            {budget !== undefined && (
              <p className="text-sm mb-2">
                Budget: £{budget}bn | Remaining: £{Math.max(budget - spent, 0).toFixed(1)}bn
              </p>
            )}
            <SliderGroup title="" sliders={sliders} onChange={handleChange} />
          </div>
        );
      })}
    </div>
  );
}

export default DepartmentGroup;
