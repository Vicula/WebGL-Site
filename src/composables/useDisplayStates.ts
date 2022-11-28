import { ref } from "vue";
import { Composable } from "@/Mixins";

export function __useDisplayStates<T>(st: T) {
  return new useDisplayStates(st);
}

export class useDisplayStates<T> extends Composable {
  public state;

  constructor(state: T) {
    super("useDisplayStates");
    this.state = ref(state);
  }
}
