import { useEntityRegistry } from "./Entity";
import { useComposableRegistry } from "./Composable";
import { useSystemRegistry } from "./System";

export function useRegistry() {

    const
        entityRegistry = useEntityRegistry(),
        composableRegistry = useComposableRegistry(),
        systemRegistry = useSystemRegistry(),

        entities = new Map(),
        systems = new Map();

    return {
        addEntity: entityRegistry.addEntity,
        useEntity: entityRegistry.useEntity,
    }
}