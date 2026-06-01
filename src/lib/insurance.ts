// src/lib/insurance.ts

export type InsuranceCategory = "fotografia-video" | "montana-camping" | "deportes-acuaticos";

export const HIGH_RISK_CATEGORIES: InsuranceCategory[] = ["fotografia-video"];

export const INSURANCE_RATES = {
  HIGH_RISK: 0.2,   // 20% - Photography/Video
  STANDARD: 0.1,    // 10% - All others
} as const;

/**
 * Returns true if category is high risk (Photography/Video).
 */
export function isHighRiskCategory(category: InsuranceCategory): boolean {
  return HIGH_RISK_CATEGORIES.includes(category);
}

/**
 * Returns the insurance rate for a category.
 */
export function getInsuranceRate(category: InsuranceCategory): number {
  return isHighRiskCategory(category)
    ? INSURANCE_RATES.HIGH_RISK
    : INSURANCE_RATES.STANDARD;
}

/**
 * Returns the rate as a readable label (e.g. "20%").
 */
export function getInsuranceRateLabel(category: InsuranceCategory): string {
  return isHighRiskCategory(category) ? "20%" : "10%";
}

/**
 * Calculates the total insurance fee.
 * Photography/Video: 20% of daily rate × days
 * All others: 10% of daily rate × days
 */
export function calculateInsurance(
  category: InsuranceCategory,
  dailyRate: number,
  days: number
): number {
  return parseFloat((dailyRate * getInsuranceRate(category) * days).toFixed(2));
}