import type { Plot } from "../types";

type GardenCellProps = {
  plot: Plot;
  onClick: (id: string) => void;
};

export default function GardenCell({ plot, onClick }: GardenCellProps) {
  return (
    <div className="garden-cell" onClick={() => onClick(plot.id)}>
      {plot.plantId ?? ""}  {/**Displays plantId or empty string if null */}
    </div>
  );
}