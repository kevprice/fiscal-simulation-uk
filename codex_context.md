here is a context.md document for this repo

# UK Budget Simulator - Codex Context

## ✅ Purpose
This project is a **UK government budget simulator**. It allows users to interactively adjust tax and spending levers via sliders to see how these changes affect key metrics like total revenue, expenditure, budget deficit/surplus, and national debt.

The app is meant to be **educational, intuitive, and data-informed**. The user interface is visual, using sliders and charts.

## 🧱 Architecture

- **Frontend**: React + Tailwind CSS
- **Charts**: Chart.js (via react-chartjs-2)
- **Data**: Hardcoded fiscal baseline from OBR and Treasury, with optional real-data import later.
- **Backend**: Not required initially. Future versions may include Python or Node.js simulation logic.

## 📁 File Structure


uk-budget-simulator/
│
├── public/
├── src/
│ ├── components/
│ │ ├── SliderGroup.jsx # Renders grouped sliders for revenue or spending
│ │ ├── OutputSummary.jsx # Shows totals, deficit/surplus, and national debt
│ │ ├── ChartDisplay.jsx # Pie or bar charts visualizing the budget
│ │
│ ├── data/
│ │ └── fiscalBaseline.js # Hardcoded revenue and spending baselines
│ │
│ ├── utils/
│ │ └── calculations.js # Derived values like totals and debt logic
│ │
│ ├── App.jsx # Main layout and app logic
│ └── index.js # React root
│
├── context.md # Codex context file describing project
├── package.json
└── README.md


## 💸 Budget Categories

### Revenue Levers:
- Income Tax
- National Insurance
- VAT
- Corporation Tax
- Duties (fuel, alcohol, tobacco)
- Other (misc. revenue)

### Spending Levers:
- Health
- Education
- Defence
- Welfare (excl. pensions)
- Pensions
- Infrastructure
- Local Government Grants
- Debt Interest

## 📊 Derived Metrics
- **Total Revenue** = sum of all revenue categories
- **Total Spending** = sum of all spending categories
- **Deficit / Surplus** = Revenue − Spending
- **National Debt** = Cumulative deficit (can be modeled simply at first)
- **Debt Interest** = Derived from national debt (e.g., 2.5% interest per year)

## ⚙️ Logic Assumptions (Simple Model)
- All inputs and outputs are in **billion GBP**
- Sliders use a baseline value from `fiscalBaseline.js`
- Changes are linear at first (e.g., increasing income tax increases revenue directly)
- Optional advanced logic (e.g., GDP feedback, Laffer curve) can be added later

## 📚 Data Source References
- OBR: https://obr.uk/data/
- HM Treasury: https://www.gov.uk/government/publications
- ONS: https://ons.gov.uk

## 🔮 Future Features (Planned)
- Load/save scenarios
- Real-time feedback on GDP or economic growth
- Multiplayer or classroom mode
- Export to CSV
- Policy suggestion mode ("balance the budget")

## 🧠 Codex Usage Guidance
- Refer to this context when creating or updating component logic, especially derived metrics.
- Assume no backend unless otherwise stated.
- All calculations should use the values from `fiscalBaseline.js` unless overridden by user sliders.
