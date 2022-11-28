import { computed, ref } from "vue";
import { Utils } from "@/utils";
import { Composable } from "@/Mixins";

export function __useLoading() {
  return useLoading;
}

// we extend from Composable to assign unique eid
// these composables by design are TO NOT be used with vue's 'setup' lifecycle hook.
// By design these just encapsulate state data
export class useLoading extends Composable {
  // state encapsulated and managed by the composable
  private loading = ref(false);
  private delay = ref(0);

  // stating a computed with a get/set pair
  // returns a type of WritableRef
  public isLoading = computed({
    get: () => this.loading.value,
    set: async (val) => {
      this.delay.value && (await Utils.sleep(this.delay.value));
      this.loading.value = val;
    },
  });

  constructor(isLoading?: boolean, delay?: number) {
    super("useLoading");
    delay && (this.delay.value = delay);
    isLoading && (this.isLoading.value = isLoading);
  }
}
