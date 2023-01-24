export {
    ref,
    isRef,
    unref,
    inject,
    provide,
    watch,
    reactive,
    computed,
    getCurrentInstance,
    onMounted,
    onUnmounted,
    onActivated,
    onBeforeMount,
    onBeforeUnmount,
    onDeactivated,
    readonly,
    toRaw,
    customRef,
    watchEffect,
    type Plugin,
    type App,
    type DeepReadonly,
    type ComputedRef,
    type UnwrapRef,
    type InjectionKey,
    type Ref,
} from "vue";

const NO_OP = () => { };

export const vueDelete: (o: object, p: string) => void = NO_OP;

export const vueSet: (o: object, p: string, v: any) => void = NO_OP;