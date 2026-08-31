import { useState } from "react";
import GardenGrid from "./GardenGrid";
import type { Plot } from "../types";

export default function Garden() {
    const [plots, setPlots] = useState<Plot[]>(createInitialPlots());
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    function toggleSelectClick(id: string) {
        setSelectedIds((prev) => {
            const selected = new Set(prev);
            selected.has(id) ? selected.delete(id) : selected.add(id);
            return selected;
        });
    }

    function handleCellClick(id: string) {
        setPlots((prev) => 
            prev.map((plot) => (plot.id === id ? { ...plot, plantId: "tomato" } : plot))
        ); {/**Updates plantId of plot with matching id. Leaves plot as it is otherwise. */}
    }
    return <GardenGrid plots={plots} selectedPlots={selectedIds} onCellClick={toggleSelectClick} />;
}

function createInitialPlots() {
    const plots: Plot[] = [];
    let i = 0;
    for (let row = 0; row<6; row++) {
        for (let col = 0; col<6; col++) {
            plots.push({id:i.toString(), row, col, icon:"", plantId:null, customLabel:null, plantedDate:null});
            i++;
        }
    }
    return plots;
}
