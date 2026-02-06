// src/utils/formatCurrency.ts

export const formatCurrency = (amount: number): string => {
  return `₱${Number(amount).toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};