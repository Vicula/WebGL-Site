import type { IPool } from "@/types";

export function usePool<T>(): IPool<T> {
    const
        __data: Map<string, T> = new Map();

    return {
        isEmpty: () => !!(__data.size === 0),
        size: () => __data.size,
        clear: () => __data.clear(),
        add: (id: string, obj: T) => __data.set(id, obj),
        set: (index: string, obj: T) => __data.set(index, obj),
        get: (index: string) => __data.get(index)
    }
}