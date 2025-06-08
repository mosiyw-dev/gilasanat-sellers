import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNumber = (value: string | number | undefined | null): string => {
  if (!value) return ''
  const stringValue = value.toString()
  return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
