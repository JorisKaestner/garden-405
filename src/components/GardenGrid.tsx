import type { Plot } from "../types";
import GardenCell from "./GardenCell";

type GardenGridProps = {
    plots: Array<Plot>;
    onCellClick: (id:string) => void;
};

export default function GardenGrid({plots, onCellClick} : GardenGridProps) {
    return(
        <div className="garden-grid">
            {plots.map((plot) => <GardenCell key={plot.id} plot={plot} onClick={onCellClick}/>)}
        </div>
    );
};