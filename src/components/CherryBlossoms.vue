<script lang="tsx">
/**
==============================================================================
 *
 * @module  CherryBlossoms
 * @brief   HTML Canvas component used to render and display a WebGL animated
 *          background of CherryBlossoms using GLSL shaders to add lights,
 *          blur and general Post Processing finishing
 *
 ==============================================================================
 */
export default {
  Skeleton: <Skeleton />,
};
</script>

<template>
  <canvas ref="sakura" id="sakura" />
</template>

<script setup lang="tsx">
import { AnimatedSkeleton as Skeleton } from "@/components";

// setViewports();
// createScene();
// initScene();

// timeInfo.start = new Date();
// timeInfo.prev = timeInfo.start;
// animate();

defineExpose({});
</script>

<style lang="scss" scoped>
.test,
.test-placeholder {
  color: blue;
  background: goldenrod;
}
</style>
