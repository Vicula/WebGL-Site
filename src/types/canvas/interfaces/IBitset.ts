export interface IBitset {
    set: (i: number) => void;
    clear: (i: number) => void;
    get: (i: number) => boolean;
}