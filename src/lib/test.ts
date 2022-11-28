import {
  createDecorator,
  PropOptions,
  VueDecorator,
  setup,
} from "vue-class-component";
import { proxyRefs, computed } from "vue";

export const Use = <TComposables>(conf?: any): VueDecorator => {
  return createDecorator((componentOptions, key) => {
    const originalSetup = componentOptions.setup;
    componentOptions.setup = (props, ctx) => {
      const result = originalSetup?.(props, ctx);

      return {
        ...result,
        [key]: proxyRefs(
          computed({
            get: () => {
              return "test";
            },
            set: (val) => val,
          })
        ),
      };
    };
  });
};

export const Set = <TComposables>(conf?: any): VueDecorator => {
  return createDecorator((componentOptions, key) => {
    const originalSetup = componentOptions.setup;
    componentOptions.setup = (props, ctx) => {
      const result = originalSetup?.(props, ctx);

      return {
        ...result,
        [key]: proxyRefs(
          computed({
            get: () => {
              return "test";
            },
            set: (val) => val,
          })
        ),
      };
    };
  });
};

export const Get = <TComposables>(conf?: any): VueDecorator => {
  return createDecorator((componentOptions, key) => {
    const originalSetup = componentOptions.setup;
    componentOptions.setup = (props, ctx) => {
      const result = originalSetup?.(props, ctx);

      return {
        ...result,
        [key]: proxyRefs(
          computed({
            get: () => {
              return "test";
            },
            set: (val) => val,
          })
        ),
      };
    };
  });
};
