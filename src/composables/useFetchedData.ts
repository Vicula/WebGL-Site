import { computed, ref } from "vue";
import { Composable } from "@/Mixins";

// we extend from Composable to assign unique eid
export function useFetchedData() {
  return class useFetchedData<T> extends Composable {
    // state encapsulated and managed by the composable
    public data = ref(null);
    public error = ref(null);

    constructor(isLoading?: boolean, delay?: number) {
      super("useFetchedData");
    }
  };
}
