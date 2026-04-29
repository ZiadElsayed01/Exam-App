import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
}

export function sanitize(text: string): string {
  return text.replace(/[^a-zA-Z0-9]+/g, " ");
}
