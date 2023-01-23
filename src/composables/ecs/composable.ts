import { ref } from "@/API";

export function useComposable() {
    const
        __nextId = ref(0),
        GetId = () => __nextId.value++
}