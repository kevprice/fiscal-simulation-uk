import { spending2024 } from './obr2024Budget';

export const departmentBudgets = {
  'Department of Health and Social Care': {
    weight: 0.3,
    budget: spending2024.health,
    categories: {
      health: spending2024.health,
    },
  },
  'Department for Education': {
    weight: 0.2,
    budget: spending2024.education,
    categories: {
      education: spending2024.education,
    },
  },
  'Ministry of Defence': {
    weight: 0.05,
    budget: spending2024.defence,
    categories: {
      defence: spending2024.defence,
    },
  },
  'Department for Work and Pensions': {
    weight: 0.25,
    budget:
      spending2024.unemployment +
      spending2024.disability +
      spending2024.pensions,
    categories: {
      unemployment: spending2024.unemployment,
      disability: spending2024.disability,
      pensions: spending2024.pensions,
    },
  },
  'Housing and Local Government': {
    weight: 0.15,
    budget: spending2024.housingSupport + spending2024.localGov,
    categories: {
      housingSupport: spending2024.housingSupport,
      localGov: spending2024.localGov,
    },
  },
  'Infrastructure and Transport': {
    weight: 0.05,
    budget: spending2024.infrastructure,
    categories: {
      infrastructure: spending2024.infrastructure,
    },
  },
  'Home Office': {
    weight: 0,
    budget: spending2024.homeOffice,
    categories: {
      homeOffice: spending2024.homeOffice,
    },
  },
  'Ministry of Justice': {
    weight: 0,
    budget: spending2024.justice,
    categories: {
      justice: spending2024.justice,
    },
  },
  'Department for Business and Trade': {
    weight: 0,
    budget: spending2024.business,
    categories: {
      business: spending2024.business,
    },
  },
  'Department for Environment, Food & Rural Affairs': {
    weight: 0,
    budget: spending2024.environment,
    categories: {
      environment: spending2024.environment,
    },
  },
  'Foreign, Commonwealth & Development Office': {
    weight: 0,
    budget: spending2024.foreignAffairs,
    categories: {
      foreignAffairs: spending2024.foreignAffairs,
    },
  },
  'Department for Culture, Media & Sport': {
    weight: 0,
    budget: spending2024.culture,
    categories: {
      culture: spending2024.culture,
    },
  },
  'Department for Science, Innovation & Technology': {
    weight: 0,
    budget: spending2024.science,
    categories: {
      science: spending2024.science,
    },
  },
  'HM Treasury': {
    weight: 0,
    budget: spending2024.treasury,
    categories: {
      treasury: spending2024.treasury,
    },
  },
  'Cabinet Office': {
    weight: 0,
    budget: spending2024.cabinet,
    categories: {
      cabinet: spending2024.cabinet,
    },
  },
  'Other Departments': {
    weight: 0,
    budget: spending2024.other,
    categories: {
      other: spending2024.other,
    },
  },
  'Debt Interest': {
    weight: 0,
    budget: spending2024.debtInterest,
    categories: {
      debtInterest: spending2024.debtInterest,
    },
  },
};
