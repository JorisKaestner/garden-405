import type { Plant, Plot } from "../types";

type GardenCellProps = {
  plot: Plot;
  isSelected: boolean;
  plants: Plant[];
  onClick: (id: string) => void;
  style: React.CSSProperties; // needed to get correct placement in grid
};

/** Base-level component to display a single plot and highlight its selection */
export default function GardenCell({ plot, isSelected, plants, onClick, style}: GardenCellProps) {
  const cellClass = isSelected ? "garden-cell--selected" : "garden-cell"; // change to subclass structure if needed
  const plantIcon = plants.find(plant => plant.id === plot.plantId)?.icon;
  return (
    <div 
      className={cellClass}
      onClick={() => onClick(plot.id)}
      style={style}
    >
      <span className="garden-cell-icon">{plantIcon ?? ""} </span>  {/**Displays plantIcon or empty string if null */}
    </div>
  );
}