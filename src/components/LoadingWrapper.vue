<script lang="ts">
/**
==============================================================================
 * 
 * @module    LoadingWrapper
 * @brief     Wrapper component used to embed loading state functionality and
 *            fallback displays
 * 
==============================================================================
 *
 * @emits completed: called when loading is done and the default slot is shown
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
  <Suspense v-else @resolve="onResolved">
    <slot />
    <template #fallback>
      <section class="loading-wrapper">
        <Placeholder
          v-if="Placeholder"
          :name="slotName"
          v-bind="{ [placeholderDataId]: '' }"
        />
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
  getCurrentInstance,
  type Ref,
  type DefineComponent,
  type ComponentPublicInstance,
} from "vue";

/**
 * @props
 ------------------------------------------------------------------------------
 */

export interface IProps {
  placeholder?: JSX.Element | DefineComponent<{}, {}, {}, {}, {}>;
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
 * @events
 ------------------------------------------------------------------------------
 */

const events = defineEmits(["completed"]),
  onResolved = () => {
    events("completed");
  };

/**
 * @consts
 ------------------------------------------------------------------------------
 */
// fetch the component slots then drill down to
// the default slot
const slots = useSlots(),
  defaultSlot = slots.default?.()[0],
  slotType = defaultSlot?.type as DefineComponent,
  // here we are getting a slotName from the file of the
  // parent component
  slotName = slotType.__file?.replace(/^.*[\\\/]/, "").replace(/\.[^/.]+$/, ""),
  //Getting the placeholder info from the slot
  // or using a passed prop
  Placeholder = props.placeholder ?? slotType?.Skeleton,
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
  Placeholder,
});
</script>
