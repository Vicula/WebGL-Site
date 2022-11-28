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
  placeholder: <div class="homepage-placeholder">It is loading</div>,
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

// await Utils.sleep(5000);

const loadingRef = ref<InstanceType<typeof LoadingWrapper> | null>(null);
</script>
