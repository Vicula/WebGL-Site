import type { IBitset } from "@/types";

export function useBitset(): IBitset {
    const
        __bitset = new Uint32Array(Math.ceil(32 / 32)),
        __getIndexes = (i: number) => ({
            // acquires the array index where the bit will fall
            bigIndex: Math.floor(i / 32),
            // acquires the actual bit index in the bitset number
            smallIndex: i % 32
        });

    return {
        // Set the i-th bit to 1
        set: (i: number) => {
            const { bigIndex, smallIndex } = __getIndexes(i);

            __bitset[bigIndex] = __bitset[bigIndex] | (1 << smallIndex)
        },
        // Clear the i-th bit
        clear: (i: number) => {
            const { bigIndex, smallIndex } = __getIndexes(i);

            __bitset[bigIndex] = __bitset[bigIndex] & ~(1 << smallIndex)
        },
        // Return the value of the i-th bit
        get: (i: number) => {
            const { bigIndex, smallIndex } = __getIndexes(i);

            // we convert to boolean to make sure the result is always 0 or 1,
            // instead of what is returned by the mask
            return !!(__bitset[bigIndex] & (1 << smallIndex))
        }
    }
}
