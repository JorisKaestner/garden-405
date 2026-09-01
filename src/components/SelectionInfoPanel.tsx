import type { Plot } from "../types";
import { PLANTS } from "../plants";

type SelectionPanelProps = {
    plot: Plot | null;
    onChange: (update: Partial<Plot>) => void;
};

export default function SelectionPanel({ plot, onChange }: SelectionPanelProps) {
    if (!plot) {
        return <div className="selection-panel">No plot selected.</div>
    }
    return (
        <div className="selection-panel">
            <h4>Plant</h4>
            <select
                value={plot.plantId ?? ""}
                onChange={(edit) => onChange({ plantId: edit.target.value || null })}
            >
                <option value="">-- none --</option>
                {PLANTS.map((p) => (<option key={p.id} value={p.id}>{p.name}</option>))}
            </select>

            {plot.plantId === "other" && (
                <input
                    type="text"
                    value={plot.customLabel ?? ""}
                    onChange={(e) => onChange({ customLabel: e.target.value })}
                />
            )}

            <h4>Date planted</h4>
            <input
                type="date"
                value={plot.plantedDate ?? ""}
                onChange={(edit) => onChange({ plantedDate: edit.target.value })}
            />
        </div>
    );
};