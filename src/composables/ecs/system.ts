import { IEntity } from "@/types";
import { useBitset } from "./Bitset";

export function useSystem() {
    const
        __signature = useBitset(),
        __entities = new Map<number, IEntity>();

    return {
        requireComposable: (i: number) => __signature.set(i),
        subscribe: (ent: IEntity) => { },
        unsubscribe: (ent: IEntity) => { },
        getSubscribers: () => __entities,
        getSignature: () => __signature
    }
}

export function useSystemRegistry() {
    const
        __systems = new Map();

    return {
        addSystem: (system: () => void) => __systems.set(system.name, system),
        removeSystem: (system: () => void) => __systems.delete(system.name),
        hasSystem: (system: () => void) => __systems.has(system.name),
        getSystem: (system: () => void) => __systems.get(system.name),
        subscribeEntity: (ent: IEntity) => {
            
            // const auto & entityComponentSignature = entityComponentSignatures[entity.GetId()];

            // for (auto & system : systems)
            // {
            //     const auto & systemComponentSignature = system.second -> GetComponentSignature();

            //     if ((entityComponentSignature & systemComponentSignature) == systemComponentSignature)
            //         system.second -> AddEntityToSystem(entity);
            // }
         },
        unsubscribeEntity: () => { }
    }
}

export interface ISystem {

}