export function getTotalRevenue(revenue) {
  return Object.values(revenue).reduce((sum, val) => sum + val, 0);
}

export function getTotalSpending(spending) {
  return Object.values(spending).reduce((sum, val) => sum + val, 0);
}

export function getDeficit(revenue, spending) {
  return getTotalRevenue(revenue) - getTotalSpending(spending);
}

export function getDebtInterest(debt, rate = 0.025) {
  return +(debt * rate).toFixed(1);
}

export function calculateTotals(revenue, spending, previousDebt = 1000) {
  const totalRevenue = getTotalRevenue(revenue);
  const totalSpending = getTotalSpending(spending);
  const deficit = totalRevenue - totalSpending;
  const nationalDebt = previousDebt - deficit;
  return {
    revenue: totalRevenue,
    spending: totalSpending,
    deficit,
    debt: nationalDebt,
  };
}
