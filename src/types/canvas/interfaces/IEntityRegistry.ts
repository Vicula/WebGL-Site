import { IEntity } from "./IEntity";

export interface IEntityRegistry {
    useEntity: () => IEntity;
    addEntity: () => void;
    // getEntity: () => { },
    removeEntity: (ent: IEntity) => void;
    onTick: (sys: unknown) => void;
}