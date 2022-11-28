import { ref } from "vue";
import { Composable } from "@/Mixins";

export function useTableData() {
  return class useTableData<T> extends Composable {
    public state;

    constructor(state: T) {
      super("useTableData");
      this.state = ref(state);
    }
  };
}
