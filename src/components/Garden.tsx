import { use, useEffect, useState } from "react";
import GardenGrid from "./GardenGrid";
import { type Plant, type Plot } from "../types";
import SelectionPanel from "./SelectionInfoPanel";
import gardenLayout from "../assets/gardenLayout.svg";
import { BEDS } from "../beds.ts"
import { supabase } from "../supabase/supabaseClient.ts";

/** Top-level component to render and edit the garden plots and InfoPanel*/
export default function Garden() {
    const [plots, setPlots] = useState<Plot[]>([]);
    const [plants, setPlants] = useState<Plant[]>([]);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [lastSelectedId, setLastSelectedId] = useState<string | null>(null);
    const [copiedPlot, setCopiedPlot] = useState<Partial<Plot> | null>(null);
    const [history, setHistory] = useState<Plot[][]>([]);
    const lastSelectedPlot = plots.find((p) => p.id === lastSelectedId) ?? null;

    /* Load plots from supabase */
    useEffect(() => {
        async function loadPlots() {
            const { data, error } = await supabase.from("plots").select("*");
            if (error) { console.error(error); return; }
            console.log("fetched:", data);
            setPlots(data);
        }
        loadPlots();
    }, []);

    /* Load plantTypes from supabase */
    useEffect(() => {
        async function loadPlants() {
            const { data, error } = await supabase.from("plants").select("*");
            if (error) { console.error(error); return; }
            console.log("fetched:", data);
            setPlants(data);
        }
        loadPlants();
    }, []);

    function selectClick(id: string) {
        const selected = new Set<string>();
        selected.add(id);
        setLastSelectedId(id);
        setSelectedIds(selected);
    }

    async function updatePlot(id: string, update: Partial<Plot>) {
        setHistory((h) => [...h, plots]);
        setPlots((prev) => prev.map((plot) => (plot.id === id ? { ...plot, ...update } : plot)));
        const { error } = await supabase.from("plots").update(update).eq("id", id);
        if (error) console.error(error);
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
                {BEDS.map((bed) => (
                    <div key={bed.id} className="bed-overlay" style={{ left: bed.left, top: bed.top, width: bed.width, height: bed.height }}>
                        <GardenGrid
                            plots={plots.filter((p) => p.gardenId === bed.id)}
                            rows={bed.rows}
                            cols={bed.cols}
                            plants={plants}
                            selectedPlots={selectedIds}
                            onCellClick={selectClick}
                        />
                    </div>
                ))}
            </div>
            <div>
                <SelectionPanel plot={lastSelectedPlot} plants={plants} onChange={(update) => lastSelectedId && updatePlot(lastSelectedId, update)} />
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
