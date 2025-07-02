export const fiscalAssumptions = {
  unemployment: {
    multiplier: 1.3,
    source:
      'IMF (2014) - Fiscal Multipliers: https://www.imf.org/external/pubs/ft/spn/2014/spn1402.pdf',
  },
  infrastructure: {
    multiplier: 2.0,
    source:
      'OECD (2016) - Infrastructure and Growth: https://www.oecd.org/economy/growth/Infrastructure-investment-and-growth.pdf',
  },
  incomeTax: {
    lafferPeak: 0.6,
    source:
      'Diamond & Saez (2011) - JEP Optimal Taxation: https://eml.berkeley.edu/~saez/diamond-saezJEP11opttax.pdf',
  },
};
