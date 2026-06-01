// src/lib/insurance.ts

export const HIGH_RISK_CATEGORIES = ["fotografia-video"];

export const INSURANCE_RATES = {
  HIGH_RISK: 0.2,
  STANDARD: 0.1,
};

export function isHighRiskCategory(categoryId: string): boolean {
  return HIGH_RISK_CATEGORIES.includes(categoryId);
}

export function getInsuranceRate(categoryId: string): number {
  return isHighRiskCategory(categoryId)
    ? INSURANCE_RATES.HIGH_RISK
    : INSURANCE_RATES.STANDARD;
}

export function getInsuranceRateLabel(categoryId: string): string {
  const rate = getInsuranceRate(categoryId);
  return `${rate * 100}%`;
}

export function calculateInsurance(
  categoryId: string,
  dailyRate: number,
  days: number
): number {
  if (dailyRate === 0 || days === 0) return 0;
  
  const rate = getInsuranceRate(categoryId);
  const total = rate * dailyRate * days;
  
  // Usamos Math.round para manejar el caso límite de los decimales
  // ej: 0.1 * 33.33 * 3 = 9.999 -> se redondea a 10
  return Math.round(total);
}