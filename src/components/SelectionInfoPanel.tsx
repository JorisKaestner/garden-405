import type { Plot } from "../types";
import { PLANTS } from "../plants";

type SelectionPanelProps = {
  plot: Plot | null;
  onChange: (update: Partial<Plot>) => void;
};

export default function SelectionPanel({plot, onChange} : SelectionPanelProps) {
    if (!plot) {
        return <div className="selection-panel">No plot selected.</div>
    }
    return(
        <div className="selection-panel">
            <h4>Plant</h4>
            <select
                value={plot.plantId ?? ""}
                onChange={(edit) => onChange({plantId: edit.target.value || null})}
            >
                <option value="">-- none --</option>
                {PLANTS.map((p) => (<option key={p.id} value={p.id}>{p.name}</option>))}
            </select>
        </div>
    );
};