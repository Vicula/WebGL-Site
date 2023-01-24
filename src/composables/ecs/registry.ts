import { useEntityRegistry } from "./Entity";
import { useComposableRegistry } from "./Composable";
import { useSystemRegistry } from "./System";

export function useRegistry() {
    const
        entityRegistry = useEntityRegistry(),
        composableRegistry = useComposableRegistry(),
        systemRegistry = useSystemRegistry();

    return {

    }
}