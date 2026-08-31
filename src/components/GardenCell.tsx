import type { Plot } from "../types";

type GardenCellProps = {
  plot: Plot;
  isSelected: boolean;
  onClick: (id: string) => void;
};

export default function GardenCell({ plot, isSelected, onClick }: GardenCellProps) {
  const cellClass = isSelected ? "garden-cell--selected" : "garden-cell"
  return (
    <div 
      className={cellClass}
      onClick={() => onClick(plot.id)}
    >
      {plot.plantId ?? ""}  {/**Displays plantid or empty string if null */}
    </div>
  );
}