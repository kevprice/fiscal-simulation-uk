import React from 'react';

function InfoBox({
  text,
  happiness,
  interestRate,
  unemploymentRate,
  gdpGain = 0,
}) {
  const explanation =
    'Happiness is weighted using ONS well-being data. ' +
    'Interest rates rise when debt and deficits increase (Gale & Orszag 2003). ' +
    'Unemployment follows Okun\'s law – extra GDP growth of £' +
    gdpGain.toFixed(1) +
    'bn lowers joblessness.';

  return (
    <div className="p-4 bg-yellow-100 rounded space-y-1">
      <p className="text-sm whitespace-pre-line">{text}</p>
      <p className="text-xs whitespace-pre-line">{explanation}</p>
      <p className="text-xs">Happiness Index: {happiness}/10</p>
      <p className="text-xs">Interest Rate: {(interestRate * 100).toFixed(2)}%</p>
      <p className="text-xs">Unemployment Rate: {unemploymentRate.toFixed(1)}%</p>
    </div>
  );
}

export default InfoBox;
