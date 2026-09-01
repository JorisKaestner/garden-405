import { useState } from "react";
import GardenGrid from "./GardenGrid";
import type { Plot } from "../types";
import SelectionPanel from "./SelectionInfoPanel";

export default function Garden() {
    const [plots, setPlots] = useState<Plot[]>(createInitialPlots());
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [lastSelectedId, setLastSelectedId] = useState<string | null>(null);

    /**
    function toggleSelectClick(id: string) {
        setLastSelectedId(id);
        setSelectedIds((prev) => {
            const selected = new Set(prev);
            selected.has(id) ? selected.delete(id) : selected.add(id);
            return selected;
        });
    }
    */

    function selectClick(id: string) {
        const selected = new Set<string>();
        selected.add(id);
        setLastSelectedId(id);
        setSelectedIds(selected);
    }

    function updatePlot(id: string, update: Partial<Plot>) {
        setPlots((prev) =>
            prev.map((plot) => (plot.id === id ? { ...plot, ...update } : plot))
        );
    }

    const lastSelectedPlot = plots.find((p) => p.id === lastSelectedId) ?? null;

    return (
        <>
            <GardenGrid plots={plots} selectedPlots={selectedIds} onCellClick={selectClick} />
            <SelectionPanel plot={lastSelectedPlot} onChange={(update) => lastSelectedId && updatePlot(lastSelectedId, update)}/>
        </>
    );
}

function createInitialPlots() {
    const plots: Plot[] = [];
    let i = 0;
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 6; col++) {
            plots.push({ id: i.toString(), row, col, plantId: null, customLabel: null, plantedDate: null });
            i++;
        }
    }
    return plots;
}
