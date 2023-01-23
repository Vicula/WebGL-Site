export function useRegistry() {
    const
        maxComposables = 32,
        numEntites = 0,
        entitySignatures: unknown = [],
        entitiesToAdd = [],
        entitiesToRemove = [],
        composablePools: unknown = [],
        systems = [],
        freeIds = [];

    const
        addEntity = () => { },
        removeEntity = () => { };

    const
        addComposable = <TArgs>(entity: unknown, ...args: TArgs[]) => {
            const
                componentId = composableId,
                entityId = entity.GetId();

            !composablePools[componentId] && (composablePools[componentId] = usePool(composable));

            componentPool = componentPools[componentId];

            new Composable();

            componentPool.set(entityId, newComponent);

            entitySignatures[entityId].set(componentId);
        },
        removeComposable = (entity: unknown) => {
            const
                componentId = composableId,
                entityId = entity.GetId();

            entitySignatures[entityId].set(componentId, false);
        },
        hasComposable = (entity: unknown) => {
            // return entityComponentSignatures[entity.GetId()]
            //     .test(Component<TComponent>:: GetId());
        },
        getComposable = (entity: unknown) => { };

    const
        addSystem = () => { },
        removeSystem = () => { },
        hasSystem = () => { },
        getSystem = () => { };


}