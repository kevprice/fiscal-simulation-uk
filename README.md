# UK Budget Simulator

This repository contains a simple prototype for a UK budget simulator. The
project is written in React and includes sliders for adjusting revenue and
spending categories. Derived totals are displayed along with placeholder
charts.

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
│   │   └── fiscalBaseline.js
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
