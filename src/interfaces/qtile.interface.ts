export interface QTile {
    type: string;
    broken: boolean;
    clicked: boolean;
    next: () => QTile | null;
}