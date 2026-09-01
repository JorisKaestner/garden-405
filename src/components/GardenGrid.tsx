import type { Plot } from "../types";
import GardenCell from "./GardenCell";

type GardenGridProps = {
    plots: Array<Plot>;
    selectedPlots: Set<string>;
    onCellClick: (id:string) => void;
};

/** Displays GardenCell components as a grid */
export default function GardenGrid({plots, selectedPlots, onCellClick} : GardenGridProps) {
    return(
        <div className="garden-grid">
            {plots.map((plot) => <GardenCell key={plot.id} plot={plot} isSelected={selectedPlots.has(plot.id)} onClick={onCellClick}/>)}
        </div>
    );
};