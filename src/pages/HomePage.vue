<script lang="tsx">
/**
==============================================================================
 *
 * @module    HomePage
 * @brief     Home Page view
 *
 ==============================================================================
 */
export default {
  Placeholder: (
    <div class="homepage-placeholder">
      <h1>It is loading</h1>
    </div>
  ),
};
</script>

<template>
  <div id="home-page">
    <LoadingWrapper ref="loadingRef">
      <Test />
    </LoadingWrapper>
  </div>
</template>

<script setup lang="tsx">
import { LoadingWrapper, Test } from "@/components";
import { ref } from "vue";
import { Utils } from "@/utils";

await Utils.sleep(5000);

const loadingRef = ref<InstanceType<typeof LoadingWrapper> | null>(null);

defineExpose({
  loadingRef,
});
</script>

<style lang="scss" scoped>
.homepage-placeholder {
  color: red;
}
</style>
