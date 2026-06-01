// src/lib/insurance.ts

export const HIGH_RISK_CATEGORIES = ["fotografia-video"];

export const INSURANCE_RATES = {
  HIGH_RISK: 0.2,
  STANDARD: 0.1,
};

export function isHighRiskCategory(categoryId: string): boolean {
  if (!categoryId) return false;
  const normalized = categoryId.toLowerCase().trim();
  return normalized === "fotografia-video" || 
         normalized.includes("foto") || 
         normalized.includes("photo") ||
         normalized.includes("video");
}

export function getInsuranceRate(categoryId: string): number {
  return isHighRiskCategory(categoryId)
    ? INSURANCE_RATES.HIGH_RISK
    : INSURANCE_RATES.STANDARD;
}

export function getInsuranceRateLabel(categoryId: string): string {
  return isHighRiskCategory(categoryId) ? "20%" : "10%";
}

export function calculateInsurance(
  categoryId: string,
  dailyRate: number,
  days: number
): number {
  if (!dailyRate || !days) return 0;
  const rate = isHighRiskCategory(categoryId)
    ? INSURANCE_RATES.HIGH_RISK
    : INSURANCE_RATES.STANDARD;
  return Math.round(rate * dailyRate * days);
}
