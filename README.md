# UK Budget Simulator

This repository contains a simple prototype for a UK budget simulator. The
project is written in React and includes sliders for adjusting revenue and
spending categories. Derived totals are displayed along with placeholder
charts. Departmental budget sliders automatically scale each category's
spending when budgets are reduced.

## File Structure

```
uk-budget-simulator/
├── index.html
├── public/
│   └── (static assets)
├── src/
│   ├── components/
│   │   ├── SliderGroup.jsx
│   │   ├── OutputSummary.jsx
│   │   └── ChartDisplay.jsx
│   ├── data/
│   │   ├── fiscalBaseline.js
│   │   └── assumptions.js
│   ├── utils/
│   │   └── calculations.js
│   ├── App.jsx
│   ├── index.jsx
│   ├── index.css
│   └── gdp.js
├── test/
│   └── gdp.test.js
├── vite.config.js
├── tailwind.config.cjs
├── postcss.config.cjs
└── codex_context.md
```

## Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Build for production with `npm run build` and preview it with `npm run preview`.

The `npm test` script runs the existing GDP percentile tests.

## Data and Sources

Baseline revenue and spending numbers now come from the **OBR March 2024 Public
finances databank**. See `src/data/obr2024Budget.js` for the exact figures used.
Multipliers and other economic parameters are documented in
`src/data/assumptions.js` with academic references (IMF 2014, OECD 2016,
Diamond & Saez 2011).

The simulator now lists the major UK government departments such as the
Home Office, Ministry of Justice and Foreign Office. Smaller bodies are grouped
under **Other Departments**.
