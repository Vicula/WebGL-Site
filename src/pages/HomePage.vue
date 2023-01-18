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
  Skeleton: (
    <div class="homepage-placeholder">
      <h1>It is loading</h1>
    </div>
  ),
};
</script>

<template>
  <div id="home-page" ref="wrapper">
    <div class="sentinel" ref="topSentinel"></div>
    <div>
      <LoadingWrapper ref="loadingRef">
        <Test />
      </LoadingWrapper>
      <!-- <LoadingWrapper v-for="item in list" :ref="refWrap.itemRefs">
        <Test :class="'extra' + item" />
      </LoadingWrapper> -->
    </div>
    <div class="sentinel" ref="bottomSentinel"></div>
  </div>
</template>

<script setup lang="tsx">
import { LoadingWrapper, Test } from "@/components";
import { ref, shallowReactive, onMounted, onDeactivated, watch } from "vue";

const wrapper = ref<HTMLDivElement | null>(null),
  topSentinel = ref<HTMLDivElement | null>(null),
  bottomSentinel = ref<HTMLDivElement | null>(null),
  loadingRef = ref<InstanceType<typeof LoadingWrapper> | null>(null),
  listStartObserver = ref<IntersectionObserver | null>(null),
  listEndObserver = ref<IntersectionObserver | null>(null);

const count = ref(0);
const list = shallowReactive<number[]>([]);

const previousScrollHeightMinusScrollTop = ref(0);

const itemRefs = ref([]);
const refWrap = { itemRefs };

const recordScrollPosition = () => {
  wrapper.value &&
    (previousScrollHeightMinusScrollTop.value =
      wrapper.value?.scrollHeight - wrapper.value.scrollTop);
};

const restoreScrollPosition = () => {
  wrapper.value &&
    (wrapper.value.scrollTop =
      wrapper.value.scrollHeight - previousScrollHeightMinusScrollTop.value);
  // console.log('restoring scroll position', node.scrollTop)
};

const setUpInterSectionObserver = () => {
  let options = {
    root: wrapper.value,
    margin: "0px",
  };

  listEndObserver.value = new IntersectionObserver(
    handleBottomIntersection,
    options
  );
  listStartObserver.value = new IntersectionObserver(
    handleTopIntersection,
    options
  );

  bottomSentinel.value && listEndObserver.value.observe(bottomSentinel.value);
  topSentinel.value && listStartObserver.value.observe(topSentinel.value);
};

const handleTopIntersection: IntersectionObserverCallback = ([entry]) => {
  if (entry.isIntersecting) {
    console.log("topSentinel intersecting");
  }

  if (entry.isIntersecting) {
    // && this.canLoadMore && !this.isLoadingMore
    // this.loadMore();
  }
};

const handleBottomIntersection: IntersectionObserverCallback = ([entry]) => {
  if (entry.isIntersecting) {
    console.log("bottomSentinel intersecting");
  }

  if (entry.isIntersecting) {
    // && this.canLoadMore && !this.isLoadingMore
    // this.loadMore();
  }
};

watch(loadingRef, async (newQuestion, oldQuestion) => {
  console.log(newQuestion,oldQuestion);
});

onDeactivated(() => {
  listEndObserver.value && listEndObserver.value.disconnect();
  listStartObserver.value && listStartObserver.value.disconnect();
});

// async loadMore() {
//   try {
//     this.isLoadingMore = true;
//     this.recordScrollPosition();
//     let items = await this.fetchItemsAPI(this.pageNumber, this.pageCount);
//     console.log("loaded page " + this.pageNumber);

//     this.pageNumber++;
//     this.list.unshift(...items); //add items in the front
//     this.isLoadingMore = false;
//     this.$nextTick(() => {
//       this.restoreScrollPosition();
//     });
//   } catch (error) {
//     console.log("Reached end of page", error);
//     this.canLoadMore = false;
//     this.isLoadingMore = false;
//   }
// },


onMounted(() => {
  setUpInterSectionObserver();
  // window.addEventListener("scroll", (w) => {
  //   let bottomOfWindow =
  //     document.documentElement.scrollTop -
  //       window.innerHeight * (count.value - list.length) +
  //       window.innerHeight >=
  //     (wrapper.value?.offsetHeight ?? document.documentElement.offsetHeight) *
  //       0.75;

  //   if (bottomOfWindow) {
  //     count.value++;
  //     list.push(count.value);
  //     if (list.length > 3) {
  //       list.splice(0, 1);
  //     }
  //   } else if (!bottomOfWindow && atBottom) {
  //     atBottom = false;
  //   }
  // });
});
</script>

<style lang="scss" scoped>
.homepage-placeholder {
  color: red;
}

.sentinel {
  @apply h-0;
}
</style>
