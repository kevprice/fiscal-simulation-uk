import React from 'react';

function InfoBox({ text, happiness, interestRate, unemploymentRate }) {
  return (
    <div className="p-4 bg-yellow-100 rounded space-y-1">
      <p className="text-sm whitespace-pre-line">{text}</p>
      <p className="text-xs">Happiness Index: {happiness}/10</p>
      <p className="text-xs">
        Interest Rate: {(interestRate * 100).toFixed(2)}%
      </p>
      <p className="text-xs">
        Unemployment Rate: {unemploymentRate.toFixed(1)}%
      </p>
    </div>
  );
}

export default InfoBox;
