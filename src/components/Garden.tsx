
/** Garden.tsx
 *  Main-entrypoint for crop planting user interface  */

// react
import { useEffect, useState } from "react";

// components
import GardenGrid from "./GardenGrid";
import SelectionPanel from "./SelectionInfoPanel";
import gardenLayout from "../assets/gardenLayout.svg";  // TODO: move path to config file
import LoginForm from "./LoginForm.tsx";

// types
import type { Plant, Plot, Gardener } from "../types";
import { BEDS } from "../beds.ts"

// supabase
import { useAuth } from "../supabase/AuthContext.tsx";
import { supabase } from "../supabase/supabaseClient.ts";

/** Top-level component to render and edit the garden plots and InfoPanel*/
export default function Garden() {
    /*** states ***/
    // supabase persistent data
    const [plots, setPlots] = useState<Plot[]>([]);
    const [plants, setPlants] = useState<Plant[]>([]);
    const [gardeners, setGardeners] = useState<Gardener[]>([]);
    const user = useAuth();

    // UI interaction
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

    /* Load gardeners from supabase */
    useEffect(() => {
        async function loadGardeners() {
            const { data, error } = await supabase.from("gardeners").select("*");
            if (error) { console.error(error); return; }
            console.log("fetched:", data);
            setGardeners(data);
        }
        loadGardeners();
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
            {user ? (
                <div>
                    <SelectionPanel plot={lastSelectedPlot} plants={plants} gardeners={gardeners} onChange={(update) => lastSelectedId && updatePlot(lastSelectedId, update)} />
                    <div className="garden-controls">
                        <button className="copy-paste-button" onClick={() => lastSelectedPlot && setCopiedPlot({
                            plantId: lastSelectedPlot.plantId,
                            customLabel: lastSelectedPlot.customLabel,
                            plantedDate: lastSelectedPlot.plantedDate,
                        })}>Copy</button>
                        <button className="copy-paste-button" onClick={() => lastSelectedId && copiedPlot && updatePlot(lastSelectedId, copiedPlot)}>Paste</button>
                        <button className="copy-paste-button" onClick={() => revertChange()}>Revert</button>
                    </div>
                    <button onClick={() => supabase.auth.signOut()}>Sign out</button>
                </div>
            ) : (
                <div>
                    <LoginForm />
                </div>
            )}
        </div>
    );
}
