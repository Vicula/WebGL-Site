<script lang="tsx">
/**
==============================================================================
 *
 * @name    Test
 * @desc   Wrapper component used to embed loading state functionality and
 *          fallback displays
 *
 ==============================================================================
 */
export default {
  Skeleton: (
    <div class="test-placeholder">
      <Skeleton height="100vh" width="50%">
        <Skeleton height="25px" width="100px" />
        <br />
        <Skeleton height="25px" width="100px" />
        <br />
        <Skeleton height="25px" width="100px" />
      </Skeleton>
      <Skeleton height="100vh" width="50%">
        <Skeleton height="25px" width="100px" />
        <br />
        <Skeleton height="25px" width="100px" />
        <br />
        <Skeleton height="25px" width="100px" />
      </Skeleton>
    </div>
  ),
};
</script>

<template>
  <div class="test">
    <div class="block">Block 1</div>

    <div class="block">Block 2</div>
  </div>
</template>

<script setup lang="tsx">
import { AnimatedSkeleton as Skeleton } from "@/components";
import { Utils } from "@/utils";

await Utils.sleep(20000);

defineExpose({});
</script>

<style lang="scss" scoped>
.block {
  @apply h-[100vh] bg-blue-300 text-center text-6xl font-bold leading-[100vh];
}
</style>
