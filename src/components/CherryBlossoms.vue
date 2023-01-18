

<template>
  <canvas ref="canvasRef" />
  <h1>HEY There</h1>
</template>

<script setup lang="tsx">
// import { AnimatedSkeleton as Skeleton } from "@/components";
import { useCanvas } from "@/composables/canvas/Canvas";

const { canvasRef } = useCanvas();
</script>

<style lang="scss" scoped>
.test,
.test-placeholder {
  color: blue;
  background: goldenrod;
}
</style>
