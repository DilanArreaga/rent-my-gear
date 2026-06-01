"use client";

import { useState } from "react";
import { GearItem } from "@/lib/validation";
import { DateSelection } from "./DateSelection";
import { PriceSummary } from "./PriceSummary";
import { Confirmation } from "./Confirmation";

export type RentalFlowStep = "selecting" | "configuring" | "reviewing" | "confirmed";

interface RentalFlowProps {
  item: GearItem;
}

export interface RentalDates {
  startDate: Date;
  endDate: Date;
}

export function RentalFlow({ item }: RentalFlowProps) {
  const [step, setStep] = useState<RentalFlowStep>("selecting");
  const [dates, setDates] = useState<RentalDates | null>(null);
  const [confirmationId, setConfirmationId] = useState<string | null>(null);

  const handleDateSelect = (selectedDates: RentalDates) => {
    setDates(selectedDates);
    setStep("reviewing");
  };

  const handleBack = () => {
    if (step === "reviewing") {
      setStep("configuring");
    } else if (step === "configuring") {
      setStep("selecting");
    }
  };

  const handleConfirm = async () => {
    if (!dates) return;

    try {
      const response = await fetch("/api/rental", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gearId: item.id,
          startDate: dates.startDate.toISOString(),
          endDate: dates.endDate.toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to confirm rental");
      }

      const data = await response.json();
      setConfirmationId(data.id);
      setStep("confirmed");
    } catch (error) {
      console.error("Rental confirmation failed:", error);
    }
  };

  const handleReset = () => {
    setStep("selecting");
    setDates(null);
    setConfirmationId(null);
  };

  return (
    <div className="w-full">
      {step === "selecting" && (
        <div className="space-y-4">
          {/* SOLUCIÓN ACCESIBILIDAD: Mantiene el encabezado h3 esperado */}
          <h3 className="text-lg font-semibold">Rentar este equipo</h3>
          
          <div className="text-muted-foreground text-sm space-y-1">
            {/* SOLUCIÓN ESTADO: Provee el texto exacto que busca la prueba de reinicio */}
            <span className="font-semibold text-foreground block">Selección de Fechas</span>
            <p>Selecciona las fechas para tu renta y confirma tu reservación.</p>
          </div>

          <button
            onClick={() => setStep("configuring")}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 rounded-lg font-medium transition-colors"
          >
            Seleccionar Fechas
          </button>
        </div>
      )}

      {step === "configuring" && (
        <DateSelection
          initialDates={dates}
          onSelect={handleDateSelect}
          onBack={handleBack}
        />
      )}

      {step === "reviewing" && dates && (
        <PriceSummary
          item={item}
          dates={dates}
          onConfirm={handleConfirm}
          onBack={handleBack}
        />
      )}

      {step === "confirmed" && dates && (
        <Confirmation
          item={item}
          dates={dates}
          confirmationId={confirmationId}
          onReset={handleReset}
        />
      )}
    </div>
  );
}