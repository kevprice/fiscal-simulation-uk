import React from 'react';

/**
 * Displays data source references directly on the page.
 */
function SourceCitations() {
  return (
    <div className="mt-8 text-xs text-gray-600 space-y-1">
      <p>
        Sources:
        <a
          href="https://obr.uk/data/"
          className="text-blue-600 underline ml-1"
          target="_blank" rel="noopener noreferrer"
        >
          OBR Public Finances Databank (2024)
        </a>,
        <a
          href="https://www.imf.org/external/pubs/ft/spn/2014/spn1402.pdf"
          className="text-blue-600 underline ml-1"
          target="_blank" rel="noopener noreferrer"
        >
          IMF Fiscal Multipliers (2014)
        </a>,
        <a
          href="https://www.oecd.org/economy/growth/Infrastructure-investment-and-growth.pdf"
          className="text-blue-600 underline ml-1"
          target="_blank" rel="noopener noreferrer"
        >
          OECD Infrastructure and Growth (2016)
        </a>,
        <a
          href="https://eml.berkeley.edu/~saez/diamond-saezJEP11opttax.pdf"
          className="text-blue-600 underline ml-1"
          target="_blank" rel="noopener noreferrer"
        >
          Diamond & Saez Optimal Taxation (2011)
        </a>
      </p>
    </div>
  );
}

export default SourceCitations;
