// Top level import to merge types
// instead of overwriting them
// import Vue, {
//   type DefineComponent
// } from "vue";

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, never>;
  export default component;
}

declare module "@/components/*" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, never>;
  export default component;
}

declare module "@/pages/*" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, never>;
  export default component;
}

declare module "*.json" {
  const value: never;
  export default value;
}
