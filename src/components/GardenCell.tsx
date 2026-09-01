import type { Plot } from "../types";
import { PLANTS } from "../plants";

type GardenCellProps = {
  plot: Plot;
  isSelected: boolean;
  onClick: (id: string) => void;
};

/** Base-level component to display a single plot and highlight its selection */
export default function GardenCell({ plot, isSelected, onClick }: GardenCellProps) {
  const cellClass = isSelected ? "garden-cell--selected" : "garden-cell"; // change to subclass structure if needed
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