import React from 'react';
import SliderGroup from './SliderGroup';

function DepartmentGroup({ departments, spending, onChange }) {
  return (
    <div className="space-y-4">
      {Object.entries(departments).map(([deptName, dept]) => {
        const categories = dept.categories;
        const sliders = Object.keys(categories).map((key) => ({
          label: key,
          value: spending[key],
          min: 0,
          max: categories[key] * 2,
          step: 1,
        }));
        const handleChange = (index, value) => {
          const keys = Object.keys(categories);
          onChange(keys[index], value);
        };
        return (
          <div key={deptName} className="border rounded p-2 bg-gray-50">
            <h3 className="font-semibold mb-2">{deptName}</h3>
            <SliderGroup title="" sliders={sliders} onChange={handleChange} />
          </div>
        );
      })}
    </div>
  );
}

export default DepartmentGroup;
