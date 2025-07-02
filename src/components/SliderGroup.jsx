import React from 'react';

const labelMap = {
  vat: 'VAT',
  localGov: 'Local Government',
};

function formatLabel(label) {
  if (labelMap[label]) return labelMap[label];
  return label
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
}

function SliderGroup({ title, sliders, onChange }) {
  return (
    <div className="p-4">
      <h2 className="font-bold mb-2">{title}</h2>
      {sliders.map(({ label, value, min, max, step, disabled }, index) => (
        <div key={index} className="mb-4">
          <label className="block mb-1">
            {formatLabel(label)}: £{value}bn
          </label>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(index, Number(e.target.value))}
            className="w-full"
            disabled={disabled}
          />
        </div>
      ))}
    </div>
  );
}

export default SliderGroup;
