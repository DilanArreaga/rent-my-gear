// src/lib/insurance.ts

export const HIGH_RISK_CATEGORIES = ["fotografia-video"] as const;

export const INSURANCE_RATES = {
  HIGH_RISK: 0.2,
  STANDARD: 0.1,
} as const;

export function isHighRiskCategory(category: string): boolean {
  return (HIGH_RISK_CATEGORIES as readonly string[]).includes(category);
}

export function getInsuranceRate(category: string): number {
  return isHighRiskCategory(category)
    ? INSURANCE_RATES.HIGH_RISK
    : INSURANCE_RATES.STANDARD;
}

export function getInsuranceRateLabel(category: string): string {
  return isHighRiskCategory(category) ? "20%" : "10%";
}

/**
 * Calculates insurance fee.
 * Photography/Video (fotografia-video): 20% of dailyRate × days
 * All others: 10% of dailyRate × days
 */
export function calculateInsurance(
  category: string,
  dailyRate: number,
  days: number
): number {
  const rate = isHighRiskCategory(category)
    ? INSURANCE_RATES.HIGH_RISK
    : INSURANCE_RATES.STANDARD;
  return parseFloat((dailyRate * rate * days).toFixed(2));
}