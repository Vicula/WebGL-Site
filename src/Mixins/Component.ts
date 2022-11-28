/**
 ==============================================================================
 * @file   Component.ts
 * @brief   Component mixin used to extend all other components
 ==============================================================================
 * @attention
 *
 * Copyright (c) International Market Centers, LLC
 * All rights reserved.
 *
 ==============================================================================
 */
import { Vue } from "vue-class-component";

export function Component<T>(...args: any[]) {
  return class Component extends Vue {
    public addComposables() {
      return class _Component extends Component {};
    }
  };
}
