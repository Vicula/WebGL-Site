import type { IEntity } from "@/types";
import { ref } from "@/API";

export function useEntityRegistry() {
    const
        __cmpRegistry = ref<unknown | null>(null),
        __maxEntities = 32768, // some large arbitrary number
        __entitiesToAdd: IEntity[] = [],
        __entitiesToRemove: IEntity[] = [],
        __entitySignatures = new Map(),
        __freeIds: number[] = [],
        __newEntity = (id: number): IEntity => {
            const
                __id = id;

            return {
                getId: () => __id,
                destory: () => { },
                addComposable: () => { },
                removeComposable: () => { },
                hasComposable: () => { },
                getComposable: () => { },
                setRegistry: () => { }
            }
        };

    return {
        useEntity: () => __newEntity(__freeIds.shift() ?? (__entitySignatures.size || 1)),
        addEntity: () => {
            __entitiesToAdd.push(
                __newEntity(
                    __freeIds.shift() ?? (__entitySignatures.size || 1)
                ))
        },
        // getEntity: () => { },
        removeEntity: (ent: IEntity) => __entitiesToRemove.push(ent),
        setComposableRegistry: (cmpRegistry: unknown) => __cmpRegistry.value = cmpRegistry,
        onTick: (sys: unknown) => {
            // for (auto entity : entitiesToBeAdded)
            // {
            //     AddEntityToSystems(entity);
            // }
            __entitiesToAdd.length = 0;

            // for (auto entity : entitiesToBeKilled)
            // {
            //     RemoveEntityFromSystems(entity);
            //     entityComponentSignatures[entity.GetId()].reset();
            //     freeIds.push_back(entity.GetId());
            // }
            __entitiesToRemove.length = 0;
        }
    }
}


