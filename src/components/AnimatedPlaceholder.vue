<script lang="ts">
/**
==============================================================================
 * @module    AnimatedPlaceholder.vue
 * @brief     Placeholder UI element used for rendering loading display states
 *            as fallback for other UI elements
==============================================================================
 */
export default {};
</script>

<template>
  <div class="placeholder" />
</template>

<script setup lang="ts">
/** 
 * @props
 ------------------------------------------------------------------------------
 */
export interface IProps {
  width?: string;
  height?: string;
  radius?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  width: "50px",
  height: "50px",
  radius: "0%",
});
</script>

<style lang="scss" scoped>
@keyframes bgAnimate {
  0% {
    background-position: 50% 0;
  }
  100% {
    background-position: -150% 0;
  }
}
.placeholder {
  width: v-bind(width);
  height: v-bind(height);
  border-radius: v-bind(radius);
  background-image: linear-gradient(
    to right,
    #d6d7d8 0%,
    #e2e3e4 10%,
    #d6d7d8 20%,
    #d6d7d8 100%
  );
  background-size: 200% 100%;
  box-shadow: 0 4px 6px -1px rgb(0 0 0/ 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  animation: bgAnimate 1.2s linear infinite;
}
</style>
