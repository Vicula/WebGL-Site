export function usePool<T>() {
    const
        __data: T[] = [];

    const
        isEmpty = () => __data.length === 0,
        size = () => __data.length,
        clear = () => __data.length = 0,
        add = (obj: T) => __data.push(obj),
        set = (index: number, obj: T) => __data[index] = obj,
        get = (index: number) => __data[index];

    return {
        isEmpty,
        size,
        clear,
        add,
        set,
        get
    }
}