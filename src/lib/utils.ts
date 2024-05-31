import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function parseColor(color: string) {
  let baseColor = color;
  baseColor = color.replace("#", "");
  return parseInt(baseColor, 16);
}

export const colors = {
  blue: parseColor("#1995fa"),
  red: parseColor("#ff697b"),
  parse: parseColor,
};
