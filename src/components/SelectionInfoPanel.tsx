/** SelectionInfoPanel.tsx
 *  Side panel to display and edit information about selected plot
 */
import type { Plant, Plot, Gardener } from "../types";

type SelectionPanelProps = {
    plot: Plot | null;
    plants: Plant[];
    gardeners: Gardener[];
    onChange: (update: Partial<Plot>) => void;
};

/** Display a info box below the garden plots to show editable information about the selected plot.
 * 
 * Saves automatically on change. */
export default function SelectionPanel({ plot, plants, gardeners, onChange }: SelectionPanelProps) {
    if (!plot) {
        return <div className="selection-panel">No plot selected.</div>
    }
    return (
        <div className="selection-panel">
            <div className="bed-row">
                {/** 'Plant' selector*/}
                <div className="bed">
                    <h4>Plant</h4>
                    <select
                        value={plot.plantId ?? ""}
                        onChange={(edit) => onChange({ plantId: edit.target.value || null })}
                    >
                        <option value="">-- none --</option>
                        {plants.map((p) => (<option key={p.id} value={p.id}>{p.name}</option>))}
                    </select>

                    {/* Custom label option only gets displayed, when plantId 'other' is selected */}
                    {plot.plantId === "other" && (
                        <input
                            type="text"
                            value={plot.customLabel ?? ""}
                            onChange={(e) => onChange({ customLabel: e.target.value })}
                        />
                    )}
                </div>
                
                {/** 'Date planted' selector */}
                <div className="bed">
                    <h4>Date planted</h4>
                    <input
                        type="date"
                        value={plot.plantedDate ?? ""}
                        onChange={(edit) => onChange({ plantedDate: edit.target.value })}
                    />
                </div>
                
                {/** 'Planted by' selector */}
                <div className="bed">
                    <h4>Planted by</h4>
                    <select
                        value={plot.plantedBy ?? ""}
                        onChange={(edit) => onChange({ plantedBy: edit.target.value || null })}
                    >
                        <option value="">-- none --</option>
                        {gardeners.map((g) => (<option key={g.id} value={g.id}>{g.name}</option>))}
                    </select>
                </div>
            </div>
        </div>
    );
};