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
      {sliders.map(
        ({ label, value, min, max, step, baseline, disabled, info }, index) => {
          const percent = baseline !== undefined ? ((baseline - min) / (max - min)) * 100 : null;
          return (
            <div key={index} className="mb-4">
              <label className="block mb-1">
                {formatLabel(label)}: £{value}bn
              </label>
              <div className="relative">
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
                {percent !== null && (
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-blue-500"
                    style={{ left: `${percent}%` }}
                  />
                )}
            </div>
            {info && (
              <p className="text-xs text-gray-600 mt-1 whitespace-pre-line">{info}</p>
            )}
          </div>
        );
      }
      )}
    </div>
  );
}

export default SliderGroup;
