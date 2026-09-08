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
    { id: "strawberry", rows: 5, cols: 5, left: "62%", top: "71.6%", width: "21%", height: "13.5%" },
    { id: "sunflower", rows: 5, cols: 5, left: "32.9%", top: "71.6%", width: "21%", height: "13.5%" },
    { id: "vegetable", rows: 5, cols: 5, left: "62%", top: "53.9%", width: "21%", height: "13.5%" },
    { id: "berry", rows: 11, cols: 2, left: "17%", top: "53.9%", width: "8%", height: "31%" },
    { id: "fence", rows: 3, cols: 12, left: "32.9%", top: "89.4%", width: "50%", height: "7.2%" },
    { id: "compost", rows: 1, cols: 1, left: "76%", top: "2.8%", width: "6.4%", height: "3.8%" },
    { id: "raised1", rows: 5, cols: 2, left: "76%", top: "28%", width: "6.8%", height: "10.8%" },
    { id: "raised2", rows: 5, cols: 2, left: "76%", top: "40.4%", width: "6.8%", height: "10.8%" },
]