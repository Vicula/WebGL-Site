declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.svg";

type ClassInterface<T> = { [P in keyof T]: T[P] }
