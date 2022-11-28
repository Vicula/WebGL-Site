import {
  Colors,
  Weight,
  Breakpoints,
  Units,
  Sizes,
  SizeModifiers,
} from "./_utilityTypes";

export type BgColor = `bg-${Colors}-${Weight}`;

export type Space = `${Breakpoints}space-${"x" | "y"}-${Units}`;
export type TailWidth = `${Breakpoints}w-${Units}`;
export type TailHeight = `${Breakpoints}w-${Units}`;
export type BorderRadius = `${Breakpoints}rounded${
  | ""
  | `-${Sizes & SizeModifiers}`}`;

export type Tailwind<TString, TValidClass> =
  TString extends `${infer Class} ${infer Rest}`
    ? Class extends TValidClass
      ? `${Class} ${Tailwind<TValidClass, Rest>}`
      : never
    : TString extends `${infer Class}`
    ? Class extends TValidClass
      ? TString
      : never
    : never;
