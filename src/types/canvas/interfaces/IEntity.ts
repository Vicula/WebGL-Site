export interface IEntity {
    getId: () => void;
    destory: () => void;
    addComposable: () => void;
    removeComposable: () => void;
    hasComposable: () => void;
    getComposable: () => void;
    setRegistry: () => void;
}