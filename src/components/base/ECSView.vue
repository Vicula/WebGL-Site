<template>
  <div>
    <div class="scene-data">Amount of entities: {{ entityAmt }}</div>
    <div class="scene-wrapper">
      <Entity
        v-for="entity in entities"
        :data-eid="entity.eid"
        :key="entity.eid"
        :styleobj="entity.style"
        :eid="entity.eid"
        :entitydata="entity"
      >
        ENTITY
      </Entity>
    </div>
  </div>
</template>

<script setup lang="ts">
import Entity from "@/components/Entity.vue";
import { computed } from "vue";

function ecsInit() {
  //dispatch init
}

function addEntity() {
  // dispatch add entity
}

function ecsStop() {
  // stop ECS
}

const entities = computed((): any[] => {
  // need to get entities from store
  return [];
});

const entityAmt = computed(() => {
  // need to get entities from store then return length
  return 0;
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.scene-wrapper {
  background-color: black;
  width: 1024px;
  height: 768px;
  position: relative;
  margin: 0 auto;
  margin-top: 15px;
  overflow: hidden;
}

.scene-data {
  margin-top: 15px;
  font-size: 24px;
}
</style>