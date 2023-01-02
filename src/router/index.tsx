import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";

// For lazy loading components
function lazyView(view: string) {
  return () =>
    import(/* webpackChunkName: "lazy-view-[request]" */ `@/pages/${view}.vue`);
}

export const routes = [
  {
    path: "/",
    name: "home-page",
    component: HomePage,
    meta: {
      Placeholder: HomePage.Placeholder,
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
