import type { Plant, Plot } from "../types";
import GardenCell from "./GardenCell";

type GardenGridProps = {
    plots: Array<Plot>;
    rows: number;
    cols: number;
    plants: Plant[];
    selectedPlots: Set<string>;
    onCellClick: (id: string) => void;
};

/** Displays GardenCell components as a grid */
export default function GardenGrid({ plots, rows, cols, plants, selectedPlots, onCellClick }: GardenGridProps) {
    return (
        <div
            className="garden-grid"
            style={{
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
        >
            {plots.map((plot) => (
                <GardenCell
                    key={plot.id}
                    plot={plot}
                    isSelected={selectedPlots.has(plot.id)}
                    plants={plants}
                    onClick={onCellClick}
                    style={{ gridColumn: plot.col + 1, gridRow: plot.row + 1 }}
                />
            ))}
        </div>
    );
};