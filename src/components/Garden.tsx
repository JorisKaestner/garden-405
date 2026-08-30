import { useState } from "react";
import GardenGrid from "./GardenGrid";
import type { Plot } from "../types";

export default function Garden() {
    const [plots, setPlots] = useState<Plot[]>(createInitialPlots());
    function handleCellClick(id: string) {
        setPlots((prev) => 
            prev.map((plot) => (plot.id === id ? { ...plot, plantId: "tomato" } : plot))
        ); {/**Updates plantId of plot with matching id. Leaves plot as it is otherwise. */}
    }
    return <GardenGrid plots={plots} onCellClick={handleCellClick} />;
}

function createInitialPlots() {
    const plots: Plot[] = [];
    let i = 0;
    for (let row = 0; row<6; row++) {
        for (let col = 0; col<6; col++) {
            plots.push({id:i.toString(), row, col, plantId:null});
            i++;
        }
    }
    return plots;
}
