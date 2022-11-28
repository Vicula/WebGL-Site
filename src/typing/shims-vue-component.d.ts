// Top level import to merge types
// instead of overwriting them
import { ComponentCustomProperties } from "vue";
import type { DefineComponent } from "vue";

declare module "vue" {
  interface ComponentCustomOptions {
    Placeholder?: JSX.Element | DefineComponent<{}, {}, {}, {}, {}>;
  }

  interface ComponentCustomProperties {}

  interface ComponentCustomProps {}
}
