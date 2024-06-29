import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatTimeDelta(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds - hours * 3600) / 60)
  const secs = Math.floor(seconds - hours * 3600 - minutes * 60)
  const parts = []
  if (hours > 0) parts.push(`${hours}h`)
  if (minutes > 0) parts.push(`${minutes}m`)
  if (secs > 0) parts.push(`${secs}s`)
  return parts.join(' ')
}

function sanitizeString(value: string): string {
  return value.replace(/"/g, '\\"');
}

export function validateAndSanitize(obj: { [key: string]: any }): { [key: string]: string } | null {
  const sanitizedObj: { [key: string]: string } = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === 'string') {
        sanitizedObj[key] = sanitizeString(value);
      } else {
        console.error(`Validation failed: value of ${key} is not a string.`);
        return null; // Return null if any value is not a string
      }
    }
  }

  return sanitizedObj;
}