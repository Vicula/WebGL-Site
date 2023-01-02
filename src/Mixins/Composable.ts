/**
 ==============================================================================
 * @file   Composable.ts
 * @brief   composable mixin used to extend all other composables
 ==============================================================================
 * @attention
 *
 * Copyright (c) Victor Carpenter D.B.A., Cattail Digital, LLC 
 * All rights reserved.
 *
 ==============================================================================
 */

export type Composables<TComposable = any> = Composable & TComposable;

export class Composable {
  // state encapsulated and managed by the composable
  protected eid;

  constructor(eid: string) {
    this.eid = eid;
  }

  // protected new(){
  //   return new 
  // }
}

// class _Composable<TComposable> {
//   // state encapsulated and managed by the composable
//   public compId!: string;

//   constructor(comp: TComposable & Function) {
//     // add all the properties from generic composable
//     const proto = { ..._Composable.prototype };
//     Object.assign(proto, Object.getPrototypeOf(comp));
//     Object.setPrototypeOf(this, proto);
//     Object.assign(this, comp);

//     // set compId from extended composable
//     this.compId = comp.name;
//   }
// }

// export const Composable2: new <TComposable>(
//   comp: TComposable
// ) => _Composable<TComposable> & TComposable = _Composable as any;
