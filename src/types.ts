export type Plot = {
  id: string;
  row: number;
  col: number;
  plantId: string | null;
  customLabel: string | null;
  plantedDate: string | null;  // ISO date string ("2026-08-31")
};