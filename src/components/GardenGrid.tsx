import type { Plot } from "../types";
import GardenCell from "./GardenCell";

type GardenGridProps = {
    plots: Array<Plot>;
    rows: number;
    cols: number;
    selectedPlots: Set<string>;
    onCellClick: (id: string) => void;
};

/** Displays GardenCell components as a grid */
export default function GardenGrid({ plots, rows, cols, selectedPlots, onCellClick }: GardenGridProps) {
    return (
        <div
            className="garden-grid"
            style={{
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
        >
            {plots.map((plot) => (
                <GardenCell key={plot.id} plot={plot} isSelected={selectedPlots.has(plot.id)} onClick={onCellClick} />
            ))}
        </div>
    );
};