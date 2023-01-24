import { onMounted, onUnmounted } from "@/API"

export function useEventListener(target: HTMLElement | Window & typeof globalThis, event: string, callback: EventListener) {
    // if you want, you can also make this
    // support selector strings as target
    onMounted(() => target.addEventListener(event, callback))
    onUnmounted(() => target.removeEventListener(event, callback))
}