import { use, useState } from "react";
import GardenGrid from "./GardenGrid";
import type { Plot } from "../types";
import SelectionPanel from "./SelectionInfoPanel";
import gardenLayout from "../assets/gardenLayout.svg";
import { FIELDS } from "../fields.ts"

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
        <div className="app-layout">
            <div className="garden-canvas" style={{ position: "relative" }}>
                <img src={gardenLayout} className="garden-bg" />
                {FIELDS.map((field) => (
                    <div key={field.id} className="bed-overlay" style={{ left: field.left, top: field.top, width: field.width, height: field.height }}>
                        <GardenGrid
                            plots={plots.filter((p) => p.gardenId === field.id)}
                            rows={field.rows}
                            cols={field.cols}
                            selectedPlots={selectedIds}
                            onCellClick={selectClick}
                        />
                    </div>
                ))}
            </div>
            <div>
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
            </div>
        </div>
    );
}

function createInitialPlots() {
    const plots: Plot[] = [];
    for (let field of FIELDS) {
        for (let currentRow = 0; currentRow < field.rows; currentRow++) {
            for (let currentCol = 0; currentCol < field.cols; currentCol++) {
                const idString = `${field.id}-${currentRow}-${currentCol}`
                plots.push({ id: idString, gardenId: field.id, row: currentRow, col: currentCol, plantId: null, customLabel: null, plantedDate: null });
            }
        }
    }
    return plots;
}
