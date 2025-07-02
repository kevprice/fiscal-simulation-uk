export function calculateTotals(revenue, spending, previousDebt = 1000) {
  const totalRevenue = Object.values(revenue).reduce((a, b) => a + b, 0);
  const totalSpending = Object.values(spending).reduce((a, b) => a + b, 0);
  const deficit = totalRevenue - totalSpending;
  const nationalDebt = previousDebt - deficit;
  return {
    revenue: totalRevenue,
    spending: totalSpending,
    deficit,
    debt: nationalDebt,
  };
}
