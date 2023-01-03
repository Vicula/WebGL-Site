<script lang="ts">
/**
==============================================================================
 *
 * @module    AnimatedSkeleton
 * @alias     Skeleton
 * @brief     Skeleton UI element used for rendering loading display states
 *            as fallback for other UI elements
 * 
==============================================================================
 * 
 * @property {string} [width] - width of skeleton, ex: 100px, 5vh, 2rem
 * @property {string} [height] - height of skeleton, ex: 100px, 5vh, 2rem
 * @property {string} [radius] - border radius of skeleton, ex: 50%, 5px
 * @property {string} [name] - name of parent component for className association,
 *  it Is autoset by filename if rendered through the LoadingWrapper
 * 
==============================================================================
 * 
 * @see {@link ./LoadingWrapper.vue|LoadingWrapper} This component is primarily
 * rendered through this component see for more info
 * 
==============================================================================
 */
export default {};
</script>

<template>
  <div :class="skeletonClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useSlots, computed } from "vue";

/** 
 * @props
 ------------------------------------------------------------------------------
*/
export interface IProps {
  width?: string;
  height?: string;
  radius?: string;
  name?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  width: "50px",
  height: "50px",
  radius: "0%",
  name: "skeleton",
});

/**
  * @consts
  ------------------------------------------------------------------------------
*/
// accquire slots, check if default is set
const slots = useSlots(),
  defaultSlot = slots.default,
  hasSlot = defaultSlot !== undefined;

/**
  * @computed
  ------------------------------------------------------------------------------
*/
const skeletonClass = computed(() => {
  return [
    hasSlot ? "skeleton--dark" : "skeleton",
    { [props.name + "__skeleton"]: props.name !== "skeleton" },
  ];
});

/**
  ==============================================================================
*/
</script>

<style lang="scss" scoped>
@use "@/styles/mixins" as mixins;
/*
  =====================================
 * @Component AnimatedSkeleton
  =====================================
*/
$component: "skeleton";

// @Utilities
// --------------
$light-background: #d6d7d8;
$dark-background: #c0c1c2;
$darker-background: #abacac;
$light-shadow: #e2e3e4;
$dark-shadow: #cbcccd;
$darker-shadow: #b4b5b6;

@keyframes bgAnimate {
  0% {
    @apply bg-[50%_0];
  }
  100% {
    @apply bg-[-150%_0];
  }
}

@mixin bg($background: $light-background, $shadow: $light-shadow) {
  @apply from-[#{$background}_0%]
  via-[#{$shadow}_10%,#{$background}_20%]
  to-[#{$background}_100%]
  bg-gradient-to-r;
}

@mixin bg-colors($type) {
  @if $type == "darker" {
    @include bg($background: $darker-background, $shadow: $darker-shadow);
  } @else if $type == "dark" {
    @include bg($background: $dark-background, $shadow: $dark-shadow);
  } @else {
    @include bg($background: $light-background, $shadow: $light-shadow);
  }
}

// @block
// -------------
@include mixins.Block($component) {
  @apply h-[v-bind(height)] 
    w-[v-bind(width)] 
    animate-[bgAnimate_1.2s_linear_infinite]
    rounded-[v-bind(radius)]
    bg-[200%,100%]
    shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1),0_2px_4px_-2px_rgb(0,0,0,0.1)];

  // @--modifiers
  // -------------
  [class|="#{$component}"][class*="--dark"] > &[class*="--dark"] {
    @include bg-colors("dark");
  }

  &[class*="--dark"] {
    @include bg-colors("darker");
  }

  &:not([class*="--dark"]) {
    @include bg-colors("light");
  }
}
</style>
