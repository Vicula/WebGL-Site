import { useBitset } from "./Bitset"
import { usePool } from "./Pool";

export function useComposable(id: number) {
    const
        __id = id;

    return {
        getId: () => __id
    }
}

export function useComposableRegistry() {
    const
        __composablePools = usePool(),
        addComposable = <TArgs>(entity: unknown, ...args: TArgs[]) => {
            
            
            // // TODO get composableID
            // // TODO get entityID
            // const
            //     componentId = composableId,
            //     entityId = entity.GetId();

            // // TODO if there isnt a pool of componentID create one
            // !composablePools[componentId] && (composablePools[componentId] = usePool(composable));

            // // TODO get a ref to the created or exisiting pool
            // SINGLEcomposablePool = composablePools[componentId];

            // // TODO create a new copy of the composable
            // new Composable();

            // // TODO set the new composable to the pool
            // SINGLEcomposablePool.set(entityId, newComponent);

            // // TODO update the signatures
            // entitySignatures[entityId].set(componentId);
        },
        removeComposable = (entity: unknown) => {
            // const
            //     componentId = composableId,
            //     entityId = entity.GetId();

            // entitySignatures[entityId].set(componentId, false);
        },
        hasComposable = (entity: unknown) => {
            // return entityComponentSignatures[entity.GetId()]
            //     .test(Component<TComponent>:: GetId());
        },
        getComposable = (entity: unknown) => { },
        getBundle = () => { },
        setRegistry = () => { };

    return {

    }
}