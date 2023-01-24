<script lang="tsx">
/**
==============================================================================
 *
 * @name    CherryBlossoms
 * @desc    HTML Canvas component used to render and display a WebGL animated
 *          background of CherryBlossoms using GLSL shaders to add lights,
 *          blur and general Post Processing finishing
 *
 ==============================================================================
 */
export default {};
</script>

<template>
  <canvas ref="canvasRef" />
</template>

<script setup lang="tsx">
import { useCanvas } from "@/composables/canvas/Canvas";

const { canvasRef } = useCanvas();
</script>
