<script lang="ts">
/**
==============================================================================
 * 
 * @module    LoadingWrapper
 * @brief     Wrapper component used to embed loading state functionality and
 *            fallback displays
 * 
==============================================================================
*/
export default {};
</script>

<template>
  <section ref="wrapper" v-if="error" class="loading-wrapper">
    <span v-if="retry">Retry</span>
    <span v-else>{{ error }}</span>
  </section>
  <Suspense v-else>
    <slot />
    <template #fallback>
      <section class="loading-wrapper">
        <Placeholder v-if="Placeholder" v-bind="{ [placeholderDataId]: '' }" />
        <span v-else>Loading...</span>
      </section>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import {
  useSlots,
  ref,
  onErrorCaptured,
  type Ref,
  type DefineComponent,
  type ComponentPublicInstance,
} from "vue";

/**
 * @props
 ------------------------------------------------------------------------------
 */

export interface IProps {
  retry?: boolean;
  ssrOnly?: boolean;
  whenIdle?: boolean;
  whenVisible?: boolean | IntersectionObserverInit;
  didHydrate?: () => void;
  promise?: Promise<any>;
  on?: (keyof HTMLElementEventMap)[] | keyof HTMLElementEventMap;
}

const props = defineProps<IProps>();

/**
 * @consts
 ------------------------------------------------------------------------------
 */

// const ViewA = defineAsyncComponent(() => import("./components/ViewA.vue"));
const slots = useSlots(),
  defaultSlot = slots.default?.()[0],
  slotType = defaultSlot?.type as DefineComponent | undefined,
  Placeholder = slotType?.placeholder,
  placeholderDataId: string = slotType?.__scopeId,
  error: Ref<Error | null> = ref(null);

defaultSlot && !defaultSlot.dirs && (defaultSlot.dirs = []);

/**
 * @hooks
 ------------------------------------------------------------------------------
 */


onErrorCaptured(
  (err: Error, instance: ComponentPublicInstance | null, info: string) => {

    error.value = err;
  }
);

defineExpose({
  /**
   * Here we can doc exposed properties
   */
  error,
});
</script>
