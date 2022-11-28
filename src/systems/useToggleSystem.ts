import { System } from "@/Mixins";
import { Ref } from "vue";

export class useToggleSystem extends System() {
  private ref!: Ref<boolean>;

  public toggle(bool?: boolean) {
    this.ref.value = bool ? bool : !this.ref.value;
  }

  constructor() {
    super();
  }
}
