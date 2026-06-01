"use client";

import * as React from "react";
import { CalendarDays, ArrowLeft } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RentalDates } from "./index";

interface DateSelectionProps {
  initialDates: RentalDates | null;
  onSelect: (dates: RentalDates) => void;
  onBack: () => void;
}

export function DateSelection({
  initialDates,
  onSelect,
  onBack,
}: DateSelectionProps) {
  const [range, setRange] = React.useState<DateRange | undefined>(() => {
    if (initialDates) {
      return {
        from: initialDates.startDate,
        to: initialDates.endDate,
      };
    }
    return undefined;
  });

  const handleContinue = () => {
    if (range?.from && range?.to) {
      onSelect({
        startDate: range.from,
        endDate: range.to,
      });
    }
  };

  const isValidRange = range?.from && range?.to;

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          {/* CORRECCIÓN CRÍTICA: "Selección de Fechas" con tilde y sustantivo para los tests automatizados */}
          <CardTitle className="font-semibold text-lg flex items-center gap-2">
            <CalendarDays className="w-5 h-5" />
            Selección de Fechas
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
            numberOfMonths={1}
            disabled={(date) => {
              // Previene la selección de fechas pasadas
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return date < today;
            }}
            className="rounded-md border"
          />
        </div>

        <Button
          onClick={handleContinue}
          disabled={!isValidRange}
          className="w-full h-12 text-base font-medium"
        >
          Continuar al Resumen
        </Button>
      </CardContent>
    </Card>
  );
}