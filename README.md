# UK Budget Simulator

This repository contains a simple prototype for a UK budget simulator. The
project is written in React and includes sliders for adjusting revenue and
spending categories. Derived totals are displayed along with placeholder
charts.

## File Structure

```
uk-budget-simulator/
├── public/
│   └── index.html
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
│   ├── index.js
│   └── gdp.js
├── test/
│   └── gdp.test.js
└── codex_context.md
```

The React UI is provided as a lightweight example and does not include a
build setup. The `npm test` script runs the existing GDP percentile tests.
