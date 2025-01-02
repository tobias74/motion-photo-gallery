// Composables
import { createRouter, createWebHistory } from "vue-router";
import i18n, { defaultLocale } from "../i18n";

const routes = [
  {
    path: "/",
    redirect: `/${defaultLocale}`,
  },

  {
    path: "/:locale",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "psd",
        name: "PSD Thumbnails",
        component: () => import("@/views/Psd.vue"),
      },
      {
        path: "imprint",
        name: "Imprint",
        component: () => import("@/views/Imprint.vue"),
      },
      {
        path: "privacy",
        name: "Privacy",
        component: () => import("@/views/Privacy.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  const newLocale = to.params.locale;
  const prevLocale = from.params.locale;
  if (newLocale !== prevLocale) {
    i18n.setLocale(newLocale);
  }
});

export default router;
