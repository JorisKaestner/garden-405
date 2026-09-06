export type Plot = {
  id: string;
  gardenId: string;
  row: number;
  col: number;
  plantId: string | null;
  customLabel: string | null;
  plantedDate: string | null;  // ISO date string ("2026-08-31")
};

export type Plant = {
  id: string;
  name: string;
  icon: string | null;
};
