import {
  format,
  differenceInDays,
  addDays,
  isBefore,
  startOfDay,
  isValid,
  parseISO,
} from "date-fns";
import { es } from "date-fns/locale";
import { calculateInsurance } from "./insurance"; // 1. IMPORTAMOS TU LÓGICA DE SEGURO

/**
 * Format a date for display in Spanish locale
 */
export function formatDate(date: Date, formatStr: string = "d 'de' MMMM, yyyy"): string {
  if (!isValid(date)) return "Fecha inválida";
  return format(date, formatStr, { locale: es });
}

/**
 * Format a date range for display
 */
export function formatDateRange(startDate: Date, endDate: Date): string {
  const start = formatDate(startDate, "d MMM");
  const end = formatDate(endDate, "d MMM yyyy");
  return `${start} - ${end}`;
}

/**
 * Calculate the number of rental days (inclusive)
 * Minimum 1 day rental
 */
export function calculateRentalDays(startDate: Date, endDate: Date): number {
  const days = differenceInDays(startDate, endDate);
  // Add 1 because rental is inclusive of both start and end dates
  return Math.abs(days) + 1;
}

/**
 * Calculate total rental price
 */
export function calculateTotalPrice(dailyRate: number, days: number): number {
  return dailyRate * days;
}

/**
 * Calculate rental price breakdown including smart insurance
 * 2. AGREGAMOS EL PARÁMETRO CATEGORYID (con un valor por defecto para no romper código antiguo)
 */
/**
 * Calculate rental price breakdown including smart insurance
 * Hacemos que categoryId sea opcional (?) para no romper los tests existentes
 */
export function calculateRentalPrice(
  dailyRate: number,
  startDate: Date,
  endDate: Date,
  categoryId?: string // Aquí usamos ? para que sea opcional
): {
  days: number;
  dailyRate: number;
  subtotal: number;
  insuranceFee: number;
  insurance: number;
  total: number;
} {
  const days = calculateRentalDays(startDate, endDate);
  const subtotal = calculateTotalPrice(dailyRate, days);
  
  // Si no se proporciona una categoría (tests viejos), el seguro es 0.
  // Si se proporciona (tests nuevos e interfaz), se calcula dinámicamente.
  const insuranceFee = categoryId ? calculateInsurance(categoryId, dailyRate, days) : 0;

  return {
    days,
    dailyRate,
    subtotal,
    insuranceFee,
    insurance: insuranceFee,
    total: subtotal + insuranceFee, // El total solo incluirá seguro si existe una categoría
  };
}
/**
 * Format price in Mexican Pesos
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Check if a date is in the past
 */
export function isDateInPast(date: Date): boolean {
  const today = startOfDay(new Date());
  return isBefore(date, today);
}

/**
 * Check if a date range is valid for rental
 */
export function isValidRentalRange(startDate: Date, endDate: Date): boolean {
  const today = startOfDay(new Date());

  // Start date must be today or later
  if (isBefore(startDate, today)) return false;

  // End date must be same as or after start date
  if (isBefore(endDate, startDate)) return false;

  return true;
}

/**
 * Get the minimum selectable date (today)
 */
export function getMinSelectableDate(): Date {
  return startOfDay(new Date());
}

/**
 * Get a default end date (start date + 2 days)
 */
export function getDefaultEndDate(startDate: Date): Date {
  return addDays(startDate, 2);
}

/**
 * Parse an ISO date string safely
 */
export function parseDateSafe(dateString: string): Date | null {
  try {
    const date = parseISO(dateString);
    return isValid(date) ? date : null;
  } catch {
    return null;
  }
}

/**
 * Check if a date is available (mock implementation)
 */
export function isDateAvailable(_date: Date, _gearId: string): boolean {
  return true;
}

/**
 * Get unavailable dates for a gear item (mock implementation)
 */
export function getUnavailableDates(_gearId: string): Date[] {
  return [];
}