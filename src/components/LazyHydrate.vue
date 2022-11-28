<template>
  <div ref="wrapper" :style="{ display: 'contents' }" v-if="hydrated">
    <slot></slot>
  </div>
  <div ref="wrapper" v-else />
</template>

<script setup lang="ts">
import { onMounted, PropType, ref, watch } from "vue";
export interface IProps {
  ssrOnly?: boolean;
  whenIdle?: boolean;
  whenVisible?: boolean | IntersectionObserverInit;
  didHydrate?: () => void;
  promise?: Promise<any>;
  on?: (keyof HTMLElementEventMap)[] | keyof HTMLElementEventMap;
}
type VoidFunction = () => void;

const props = defineProps<IProps>();

const isBrowser = () => {
  return typeof window === "object";
};

const noOptions =
    !props.ssrOnly &&
    !props.whenIdle &&
    !props.whenVisible &&
    !props.on?.length &&
    !props.promise,
  wrapper = ref<Element | null>(null),
  hydrated = ref(noOptions || !isBrowser()),
  hydrate = () => {
    hydrated.value = true;
  };

onMounted(() => {
  if (wrapper.value && !wrapper.value.hasChildNodes()) {
    hydrate();
  }
});

watch(
  hydrated,
  (hydrate) => {
    if (hydrate && props.didHydrate) props.didHydrate();
  },
  { immediate: true }
);

watch(
  [() => props, wrapper, hydrated],
  (
    [{ on, promise, ssrOnly, whenIdle, whenVisible }, wrapper, hydrated],
    _,
    onInvalidate
  ) => {
    if (ssrOnly || hydrated) {
      return;
    }

    const cleanupFns: VoidFunction[] = [];
    const cleanup = () => {
      cleanupFns.forEach((fn) => {
        fn();
      });
    };

    if (promise) {
      promise.then(hydrate, hydrate);
    }

    if (whenVisible) {
      if (wrapper && typeof IntersectionObserver !== "undefined") {
        const observerOptions =
          typeof whenVisible === "object"
            ? whenVisible
            : {
                rootMargin: "250px",
              };

        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
              hydrate();
            }
          });
        }, observerOptions);

        io.observe(wrapper);

        cleanupFns.push(() => {
          io.disconnect();
        });
      } else {
        return hydrate();
      }
    }

    if (whenIdle) {
      if (typeof window.requestIdleCallback !== "undefined") {
        const idleCallbackId = window.requestIdleCallback(hydrate, {
          timeout: 500,
        });
        cleanupFns.push(() => {
          window.cancelIdleCallback(idleCallbackId);
        });
      } else {
        const id = setTimeout(hydrate, 2000);
        cleanupFns.push(() => {
          clearTimeout(id);
        });
      }
    }

    if (on) {
      const events = ([] as Array<keyof HTMLElementEventMap>).concat(on);

      events.forEach((event) => {
        wrapper?.addEventListener(event, hydrate, {
          once: true,
          passive: true,
        });
        cleanupFns.push(() => {
          wrapper?.removeEventListener(event, hydrate, {});
        });
      });
    }

    onInvalidate(cleanup);
  },
  { immediate: true }
);
</script>
