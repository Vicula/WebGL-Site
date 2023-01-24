export interface IPool<T> {
    isEmpty: () => boolean;
    size: () => number;
    clear: () => void;
    add: (id: string, obj: T) => void;
    set: (index: string, obj: T) => void;
    get: (index: string) => T | undefined;
}