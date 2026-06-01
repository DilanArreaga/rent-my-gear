"use client";

import { GearItem } from "@/lib/validation";
import { RentalDates } from "./index";
import { calculateRentalPrice } from "@/lib/date-utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ShieldCheck, Calendar, DollarSign } from "lucide-react";

interface PriceSummaryProps {
  item: GearItem;
  dates: RentalDates;
  onConfirm: () => void;
  onBack: () => void;
}

export function PriceSummary({ item, dates, onConfirm, onBack }: PriceSummaryProps) {
  // Pasamos explícitamente el item.category o item.categoryId para activar las reglas Smart Insurance
  const pricing = calculateRentalPrice(
    item.dailyRate,
    dates.startDate,
    dates.endDate,
    item.category || "standard"
  );

  return (
    <Card className="w-full shadow-md border">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          Resumen de la Renta
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center gap-1">
              <Calendar className="w-4 h-4" /> Días de renta:
            </span>
            <span className="font-semibold">{pricing.days} día(s)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Precio por día:</span>
            <span className="font-semibold">${pricing.dailyRate.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="font-medium text-foreground" data-testid="subtotal">
              ${pricing.subtotal.toFixed(2)}
            </span>
          </div>

          {pricing.insuranceFee > 0 && (
            <div className="flex justify-between text-sm bg-primary/5 p-2 rounded border border-primary/10">
              <span className="text-primary font-medium flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Seguro Inteligente:
              </span>
              <span className="font-semibold text-primary" data-testid="insurance">
                ${pricing.insuranceFee.toFixed(2)}
              </span>
            </div>
          )}

          <div className="border-t pt-3 flex justify-between items-center">
            <span className="font-bold text-base">Total General:</span>
            <span className="text-xl font-extrabold text-foreground" data-testid="total">
              ${pricing.total.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="w-1/3">
          Atrás
        </Button>
        <Button onClick={onConfirm} className="w-2/3 bg-primary text-primary-foreground font-semibold">
          Confirmar Renta
        </Button>
      </CardFooter>
    </Card>
  );
}