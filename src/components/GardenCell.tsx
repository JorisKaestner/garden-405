import type { Plot } from "../types";
import { PLANTS } from "../plants";

type GardenCellProps = {
  plot: Plot;
  isSelected: boolean;
  onClick: (id: string) => void;
};

export default function GardenCell({ plot, isSelected, onClick }: GardenCellProps) {
  const cellClass = isSelected ? "garden-cell--selected" : "garden-cell";
  const plantIcon = PLANTS.find(plant => plant.id === plot.plantId)?.icon;
  return (
    <div 
      className={cellClass}
      onClick={() => onClick(plot.id)}
    >
      {plantIcon ?? ""}  {/**Displays plantIcon or empty string if null */}
    </div>
  );
}