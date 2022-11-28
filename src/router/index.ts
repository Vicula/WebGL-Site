import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/pages/HomePage.vue";

function lazyView(view: string) {
  return () =>
    import(
      /* webpackChunkName: "lazy-view-[request]" */ `@/pages/${view}.vue`
    );
}

export const routes = [
  {
    path: "/",
    name: "home-page",
    component: HomePage,
  },
  // For lazy loading components
  /* {
    path: '/',
    name: 'home-page',
    component: () => import('@/pages/HomePage.vue'),
  }, */
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
