// src/components/features/RentalFlow/PriceSummary.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Receipt, Loader2, Shield } from "lucide-react";
import { GearItem } from "@/lib/validation";
import { formatDate, formatPrice, calculateRentalPrice } from "@/lib/date-utils";
import {
  calculateInsurance,
  getInsuranceRateLabel,
  isHighRiskCategory,
} from "@/lib/insurance";
import type { RentalDates } from "./index";

interface PriceSummaryProps {
  item: GearItem;
  dates: RentalDates;
  onConfirm: () => Promise<void>;
  onBack: () => void;
}

export function PriceSummary({ item, dates, onConfirm, onBack }: PriceSummaryProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [insuranceEnabled, setInsuranceEnabled] = useState(false);

  const pricing = calculateRentalPrice(item.dailyRate, dates.startDate, dates.endDate);
  const insuranceFee = calculateInsurance(
    item.category as Parameters<typeof calculateInsurance>[0],
    item.dailyRate,
    pricing.days
  );
  const rateLabel = getInsuranceRateLabel(
    item.category as Parameters<typeof getInsuranceRateLabel>[0]
  );
  const highRisk = isHighRiskCategory(
    item.category as Parameters<typeof isHighRiskCategory>[0]
  );
  const totalWithInsurance = insuranceEnabled
    ? pricing.total + insuranceFee
    : pricing.total;

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack} disabled={isLoading}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <CardTitle className="text-lg flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Resumen de Renta
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Item details */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-semibold mb-2">{item.name}</h4>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </div>

        {/* Dates */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
            Período de Renta
          </h4>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Fecha inicio</span>
            <span className="font-medium">{formatDate(dates.startDate)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Fecha fin</span>
            <span className="font-medium">{formatDate(dates.endDate)}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-muted-foreground">Duración</span>
            <span className="font-medium">
              {pricing.days} {pricing.days === 1 ? "día" : "días"}
            </span>
          </div>
        </div>

        {/* Smart Insurance */}
        <div
          data-testid="smart-insurance"
          className={`rounded-xl border-2 p-4 transition-all ${
            insuranceEnabled ? "border-primary bg-primary/5" : "border-muted"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <h4 className="font-semibold">Damage Protection</h4>
                {highRisk && (
                  <span
                    data-testid="high-risk-badge"
                    className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700"
                  >
                    Alto Riesgo
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Protección contra daños ·{" "}
                <span data-testid="rate-label">{rateLabel} por día</span>
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span data-testid="insurance-fee" className="font-bold">
                +{formatPrice(insuranceFee)}
              </span>
              <button
                data-testid="insurance-toggle"
                onClick={() => setInsuranceEnabled(!insuranceEnabled)}
                aria-pressed={insuranceEnabled}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  insuranceEnabled ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              >
                <span className="sr-only">
                  {insuranceEnabled ? "Desactivar seguro" : "Activar seguro"}
                </span>
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    insuranceEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
          {insuranceEnabled && (
            <p data-testid="insurance-active-msg" className="mt-3 text-xs text-primary">
              ✅ Seguro activado — {formatPrice(insuranceFee)} añadidos al total
            </p>
          )}
        </div>

        {/* Pricing breakdown */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
            Desglose de Precio
          </h4>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Tarifa diaria</span>
            <span className="font-medium">{formatPrice(pricing.dailyRate)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">
              {formatPrice(pricing.dailyRate)} x {pricing.days} días
            </span>
            <span className="font-medium">{formatPrice(pricing.subtotal)}</span>
          </div>
          {insuranceEnabled && (
            <div
              data-testid="insurance-line"
              className="flex justify-between items-center py-2 border-b text-primary"
            >
              <span>Damage Protection</span>
              <span>+{formatPrice(insuranceFee)}</span>
            </div>
          )}
          <div className="flex justify-between items-center py-3 bg-primary/5 rounded-lg px-3 -mx-3">
            <span className="font-semibold text-lg">Total</span>
            <span data-testid="total-price" className="font-bold text-xl text-primary">
              {formatPrice(totalWithInsurance)}
            </span>
          </div>
        </div>

        {/* Confirm button */}
        <Button onClick={handleConfirm} className="w-full h-12" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Procesando...
            </>
          ) : (
            "Confirmar Renta"
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Al confirmar, aceptas los términos y condiciones del servicio de renta.
        </p>
      </CardContent>
    </Card>
  );
}