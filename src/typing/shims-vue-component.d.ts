// Top level import to merge types
// instead of overwriting them
import {
  ComponentCustomProperties,
  type DefineComponent
} from "vue";

declare module "vue" {
  interface ComponentCustomOptions {
    Skeleton?: JSX.Element | DefineComponent<{}, {}, {}, {}, {}>;
  }

  interface ComponentCustomProperties { }

  interface ComponentCustomProps { }
}
