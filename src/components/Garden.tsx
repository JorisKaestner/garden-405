import { use, useState } from "react";
import GardenGrid from "./GardenGrid";
import type { Plot } from "../types";
import SelectionPanel from "./SelectionInfoPanel";
import gardenLayout from "../assets/gardenLayout.svg";

/** Top-level component to render and edit the garden plots and InfoPanel*/
export default function Garden() {
    const [plots, setPlots] = useState<Plot[]>(createInitialPlots());
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [lastSelectedId, setLastSelectedId] = useState<string | null>(null);
    const [copiedPlot, setCopiedPlot] = useState<Partial<Plot> | null>(null);
    const [history, setHistory] = useState<Plot[][]>([]);
    const lastSelectedPlot = plots.find((p) => p.id === lastSelectedId) ?? null;

    /*
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
        setHistory((h) => [...h, plots]);
        setPlots((prev) => prev.map((plot) => (plot.id === id ? { ...plot, ...update } : plot)));
    }

    function revertChange() {
        const previous = history.at(-1);
        if (!previous) return;
        setPlots(previous);
        setHistory((h) => h.slice(0, -1));
    }

    return (
        <>
            <div className="garden-canvas" style={{position: "relative"}}>
                <img src={gardenLayout} className="garden-bg" />
                <div className="bed-overlay" style={{ position: "absolute", left: "32.5%", top: "53.5%", width: "20%", height: "30%"}}>
                    <GardenGrid plots={plots} selectedPlots={selectedIds} onCellClick={selectClick} />
                </div>
            </div>
            <SelectionPanel plot={lastSelectedPlot} onChange={(update) => lastSelectedId && updatePlot(lastSelectedId, update)} />
            <div className="garden-controls">
                <button className="copy-paste-button" onClick={() => lastSelectedPlot && setCopiedPlot({
                    plantId: lastSelectedPlot.plantId,
                    customLabel: lastSelectedPlot.customLabel,
                    plantedDate: lastSelectedPlot.plantedDate,
                })}>Copy</button>
                <button className="copy-paste-button" onClick={() => lastSelectedId && copiedPlot && updatePlot(lastSelectedId, copiedPlot)}>Paste</button>
                <button className="copy-paste-button" onClick={() => revertChange()}>Revert</button>
            </div>
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
