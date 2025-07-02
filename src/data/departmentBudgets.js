import { spending2024 } from './obr2024Budget';

export const departmentBudgets = {
  'Department of Health and Social Care': {
    weight: 0.3,
    categories: {
      health: spending2024.health,
    },
  },
  'Department for Education': {
    weight: 0.2,
    categories: {
      education: spending2024.education,
    },
  },
  'Ministry of Defence': {
    weight: 0.05,
    categories: {
      defence: spending2024.defence,
    },
  },
  'Department for Work and Pensions': {
    weight: 0.25,
    categories: {
      unemployment: spending2024.unemployment,
      disability: spending2024.disability,
      pensions: spending2024.pensions,
    },
  },
  'Housing and Local Government': {
    weight: 0.15,
    categories: {
      housingSupport: spending2024.housingSupport,
      localGov: spending2024.localGov,
    },
  },
  'Infrastructure and Transport': {
    weight: 0.05,
    categories: {
      infrastructure: spending2024.infrastructure,
    },
  },
  'Debt Interest': {
    weight: 0,
    categories: {
      debtInterest: spending2024.debtInterest,
    },
  },
};
