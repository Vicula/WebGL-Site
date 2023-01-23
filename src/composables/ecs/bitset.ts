export function useBitset(): IBitset {
    const
        __bitset = new Uint32Array(Math.ceil(32 / 32)),
        __getIndexes = (i: number) => {
            const
                bigIndex = Math.floor(i / 32),
                smallIndex = i % 32;

            return {
                bigIndex,
                smallIndex
            }
        },
        // Set the i-th bit to 1
        set = (i: number) => {
            const { bigIndex, smallIndex } = __getIndexes(i);

            __bitset[bigIndex] = __bitset[bigIndex] | (1 << smallIndex)
        },
        // Clear the i-th bit
        clear = (i: number) => {
            const { bigIndex, smallIndex } = __getIndexes(i);

            __bitset[bigIndex] = __bitset[bigIndex] & ~(1 << smallIndex)
        },
        // Return the value of the i-th bit
        get = (i: number) => {
            const { bigIndex, smallIndex } = __getIndexes(i);

            // we convert to boolean to make sure the result is always 0 or 1,
            // instead of what is returned by the mask
            return (__bitset[bigIndex] & (1 << smallIndex)) != 0
        };

    return {
        set,
        clear,
        get
    }
}

export interface IBitset {
    set: (i: number) => void;
    clear: (i: number) => void;
    get: (i: number) => boolean;
}
