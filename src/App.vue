<template>
  <!-- ROUTER OUTLET -->
  <RouterView v-slot="{ Component, route }">
    <LoadingWrapper v-if="route.meta.Placeholder">
      <component :is="Component" />
    </LoadingWrapper>
  </RouterView>
</template>

<script setup lang="ts">
import { LoadingWrapper } from "@/components";
</script>

<style lang="scss">
@import "@/styles/index.scss";
</style>
