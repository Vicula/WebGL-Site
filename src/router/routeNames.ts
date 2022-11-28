import Vue from "vue";

export interface IRoutesNames {
  home: string;
}

const routesNames: Readonly<IRoutesNames> = {
  home: "home",
};

export default routesNames;
