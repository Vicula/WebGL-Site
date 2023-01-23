import { useBitset } from "./bitset";

export function useSystem() {
    const
        __signature = useBitset(),
        __entities = [],
        requireComposable = (i: number) => {
            __signature.set(i)
        },
        subscribe = (entity: unknown) => { },
        unsubscribe = (entity: unknown) => { },
        getSubscribers = () => { },
        getSignature = () => { };

}