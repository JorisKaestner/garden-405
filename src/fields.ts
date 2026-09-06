type FieldConfig = {
    id: string;
    rows: number;
    cols: number;
    left: string;
    top: string;
    width: string;
    height: string;
}

export const FIELDS: FieldConfig[] = [
    { id: "bog", rows: 5, cols: 5, left: "32.9%", top: "53.9%", width: "21%", height: "13.5%" },
    { id: "strawberry", rows: 5, cols: 5, left: "10%", top: "10%", width: "10%", height: "10%" },
    { id: "sunflower", rows: 5, cols: 5, left: "0%", top: "0%", width: "10%", height: "10%" },
    { id: "vegetable", rows: 5, cols: 5, left: "0%", top: "0%", width: "10%", height: "10%" },
    { id: "berry", rows: 10, cols: 2, left: "0%", top: "0%", width: "10%", height: "10%" },
    { id: "fence", rows: 3, cols: 10, left: "0%", top: "0%", width: "10%", height: "10%" },
    { id: "compost", rows: 2, cols: 2, left: "0%", top: "0%", width: "10%", height: "10%" },
    { id: "raised1", rows: 5, cols: 2, left: "0%", top: "0%", width: "10%", height: "10%" },
    { id: "raised2", rows: 5, cols: 2, left: "0%", top: "0%", width: "10%", height: "10%" },
]