import React from 'react';

function InfoBox({ text }) {
  return (
    <div className="p-4 bg-yellow-100 rounded">
      <p className="text-sm whitespace-pre-line">{text}</p>
    </div>
  );
}

export default InfoBox;
