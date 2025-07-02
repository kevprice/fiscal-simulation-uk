import React from 'react';

function OutputSummary({ totals }) {
  const { revenue, spending, deficit, debt } = totals;
  return (
    <div className="p-4 bg-gray-100 rounded">
      <h2 className="font-bold mb-2">Summary</h2>
      <ul>
        <li>Total Revenue: £{revenue}bn</li>
        <li>Total Spending: £{spending}bn</li>
        <li>Deficit/Surplus: £{deficit}bn</li>
        <li>National Debt: £{debt}bn</li>
      </ul>
    </div>
  );
}

export default OutputSummary;
