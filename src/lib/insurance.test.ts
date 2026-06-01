// src/lib/insurance.test.ts
import { describe, it, expect } from "vitest";
import {
  calculateInsurance,
  getInsuranceRate,
  getInsuranceRateLabel,
  isHighRiskCategory,
  HIGH_RISK_CATEGORIES,
  INSURANCE_RATES,
} from "./insurance";

describe("isHighRiskCategory", () => {
  it("returns true for fotografia-video", () => {
    expect(isHighRiskCategory("fotografia-video")).toBe(true);
  });
  it("returns false for montana-camping", () => {
    expect(isHighRiskCategory("montana-camping")).toBe(false);
  });
  it("returns false for deportes-acuaticos", () => {
    expect(isHighRiskCategory("deportes-acuaticos")).toBe(false);
  });
});

describe("getInsuranceRate", () => {
  it("returns 0.2 for fotografia-video", () => {
    expect(getInsuranceRate("fotografia-video")).toBe(0.2);
  });
  it("returns 0.1 for montana-camping", () => {
    expect(getInsuranceRate("montana-camping")).toBe(0.1);
  });
  it("returns 0.1 for deportes-acuaticos", () => {
    expect(getInsuranceRate("deportes-acuaticos")).toBe(0.1);
  });
});

describe("getInsuranceRateLabel", () => {
  it("returns 20% for fotografia-video", () => {
    expect(getInsuranceRateLabel("fotografia-video")).toBe("20%");
  });
  it("returns 10% for montana-camping", () => {
    expect(getInsuranceRateLabel("montana-camping")).toBe("10%");
  });
  it("returns 10% for deportes-acuaticos", () => {
    expect(getInsuranceRateLabel("deportes-acuaticos")).toBe("10%");
  });
});

describe("calculateInsurance", () => {
  // Photography (20%)
  it("charges 20% for fotografia-video", () => {
    expect(calculateInsurance("fotografia-video", 500, 3)).toBe(300);
  });
  it("charges 20% for 1 day fotografia-video", () => {
    expect(calculateInsurance("fotografia-video", 100, 1)).toBe(20);
  });
  // Camping (10%)
  it("charges 10% for montana-camping", () => {
    expect(calculateInsurance("montana-camping", 200, 5)).toBe(100);
  });
  // Water Sports (10%)
  it("charges 10% for deportes-acuaticos", () => {
    expect(calculateInsurance("deportes-acuaticos", 300, 2)).toBe(60);
  });
  // Edge cases
  it("returns 0 when dailyRate is 0", () => {
    expect(calculateInsurance("fotografia-video", 0, 5)).toBe(0);
  });
  it("returns 0 when days is 0", () => {
    expect(calculateInsurance("montana-camping", 200, 0)).toBe(0);
  });
  it("handles decimal rates correctly", () => {
    expect(calculateInsurance("montana-camping", 33.33, 3)).toBe(10);
  });
});

describe("constants", () => {
  it("HIGH_RISK_CATEGORIES includes fotografia-video", () => {
    expect(HIGH_RISK_CATEGORIES).toContain("fotografia-video");
  });
  it("INSURANCE_RATES.HIGH_RISK is 0.2", () => {
    expect(INSURANCE_RATES.HIGH_RISK).toBe(0.2);
  });
  it("INSURANCE_RATES.STANDARD is 0.1", () => {
    expect(INSURANCE_RATES.STANDARD).toBe(0.1);
  });
});