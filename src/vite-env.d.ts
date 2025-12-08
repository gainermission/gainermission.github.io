/// <reference types="vite/client" />

declare module 'virtual:meal-data' {
  import type { DayLogWithFilename } from './types/MealLog';
  export const mealData: DayLogWithFilename[];
}
