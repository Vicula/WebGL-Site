<script lang="tsx">
/**
==============================================================================
 *
 * @module    Test
 * @brief   Wrapper component used to embed loading state functionality and
 *          fallback displays
 *
 ==============================================================================
 */
export default {
  Placeholder: (
    <div class="test-placeholder">
      <AnimatedPlaceholder height="25px" width="100px" />
      <br />
      <AnimatedPlaceholder height="25px" width="100px" />
      <br />
      <AnimatedPlaceholder height="25px" width="100px" />
    </div>
  ),
};

import { Utils } from "@/utils";
</script>

<template>
  <div class="test">
    <p>my txt</p>
    <p>my txt</p>
    <p>my txt</p>
  </div>
</template>

<script setup lang="tsx">
import { AnimatedPlaceholder } from "@/components";

await Utils.sleep(10000);

defineExpose({});
</script>

<style lang="scss" scoped>
.test,
.test-placeholder {
  color: blue;
  background: goldenrod;
}
</style>
