import Lenis from "lenis";

export interface ProductSpec {
  size: string;
  gsm: string;
  weight: string;
  color: string;
}

export interface Product extends ProductSpec {
  id: string;
  category: string;
  images: string[];
}

declare global {
  interface Window {
    LenisInstance: Lenis | null;
  }
}

export const DETAILED_PRODUCTS: Record<string, ProductSpec[]> = {
  "Face Towel": [
    { size: '12" x 12"', gsm: "550", weight: "50g", color: "Grey, White, Brown, Beige, Navy Blue, Black" },
    { size: '13" x 13"', gsm: "600", weight: "50g", color: "Grey, White, Brown, Beige" }
  ],
  "Hand Towel": [
    { size: '16" x 26"', gsm: "325", weight: "85g", color: "White, Black, Burgundy, Purple, Navy Blue, Green, Brown" },
    { size: '16" x 26"', gsm: "340", weight: "85g", color: "White, Black, Burgundy, Purple, Navy Blue, Green, Brown" },
    { size: '16" x 26"', gsm: "550", weight: "150g", color: "White, Black, Burgundy, Purple, Navy Blue, Green, Brown" },
    { size: '16" x 27"', gsm: "380", weight: "105g", color: "White, Black, Burgundy, Purple, Navy Blue, Green, Brown" },
    { size: '16" x 27"', gsm: "550", weight: "150g", color: "White, Black, Burgundy, Purple, Navy Blue, Green, Brown" },
    { size: '16" x 29"', gsm: "420", weight: "135g", color: "White, Black, Burgundy, Purple, Navy Blue, Green, Brown" },
    { size: '16" x 29"', gsm: "480", weight: "135g", color: "White, Black, Burgundy, Purple, Navy Blue, Green, Brown" },
    { size: '16" x 29"', gsm: "550", weight: "150g", color: "White, Black, Burgundy, Purple, Navy Blue, Green, Brown" }
  ],
  "Bath Towel": [
    { size: '30" x 60"', gsm: "480", weight: "550g", color: "White, Black, Navy Blue, Brown" },
    { size: '30" x 60"', gsm: "520", weight: "600g", color: "White, Black, Navy Blue, Brown" },
    { size: '30" x 60"', gsm: "550", weight: "650g", color: "White, Black, Navy Blue, Brown" }
  ],
  "Bleach Towels": [
    { size: '36" x 72"', gsm: "450", weight: "750g", color: "Royal Blue/White" },
    { size: '36" x 72"', gsm: "450", weight: "750g", color: "Yellow/White" },
    { size: '36" x 72"', gsm: "450", weight: "750g", color: "Brown/White" }
  ],
  "Set Towels": [
    { size: '30" x 60"', gsm: "480-500", weight: "550g", color: "Black" },
    { size: '30" x 60"', gsm: "480-500", weight: "550g", color: "Navy Blue" },
    { size: '30" x 60"', gsm: "480-500", weight: "550g", color: "Beige" },
    { size: '30" x 60"', gsm: "480-500", weight: "550g", color: "Brown" },
    { size: '30" x 60"', gsm: "480-500", weight: "550g", color: "Grey" }
  ]
};
