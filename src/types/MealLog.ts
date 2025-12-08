export interface MealEntry {
  location: string;
  items: string[];
}

export interface DayLog {
  date: string;
  weight: number;
  username: string;
  meals: MealEntry[];
}

export interface DayLogWithFilename extends DayLog {
  filename: string; // For sorting: "2025-12-08.yaml"
}
