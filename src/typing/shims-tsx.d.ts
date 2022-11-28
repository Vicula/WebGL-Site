import Vue, { VNode } from "vue";

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    type IElement = VNode;
    // tslint:disable no-empty-interface
    type IElementClass = Vue;
    interface IIntrinsicElements {
      [elem: string]: any;
    }
  }
}
