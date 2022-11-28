declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, never>;
  export default component;
}
declare module "*.vue" {
  import Vue from "vue";
  const value: Vue.VueConstructor<Vue>;
  export default value;
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
