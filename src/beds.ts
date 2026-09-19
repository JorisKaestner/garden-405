type BedConfig = {
    id: string;
    rows: number;
    cols: number;
    left: string;
    top: string;
    width: string;
    height: string;
}

export const BEDS: BedConfig[] = [
    { id: "bog", rows: 5, cols: 5, left: "32.9%", top: "44%", width: "21%", height: "17.5%" },
    { id: "strawberry", rows: 5, cols: 5, left: "62%", top: "64.9%", width: "20.5%", height: "17.2%" },
    { id: "sunflower", rows: 5, cols: 5, left: "33.1%", top: "64.9%", width: "20.5%", height: "17.0%" },
    { id: "vegetable", rows: 5, cols: 5, left: "62%", top: "44%", width: "21%", height: "17.5%" },
    { id: "berry", rows: 11, cols: 2, left: "17%", top: "44.2%", width: "8.9%", height: "38%" },
    { id: "fence", rows: 3, cols: 12, left: "33.2%", top: "87.1%", width: "49.5%", height: "8.9%" },
    { id: "compost", rows: 1, cols: 1, left: "76.3%", top: "5.2%", width: "6.4%", height: "4.5%" },
    { id: "raised1", rows: 5, cols: 2, left: "76%", top: "25.6%", width: "6.7%", height: "13.3%" },
]