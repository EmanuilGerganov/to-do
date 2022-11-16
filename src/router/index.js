import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/HomeView.vue";
import SignPage from "../pages/SignPage.vue";
import CompleteTasksView from "../pages/CompleteTasksView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/completed-tasks",
      name: "completed",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: CompleteTasksView,
    },
    {
      path: "/sign",
      name: "sign",
      component: SignPage,
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../pages/RegisterPage.vue"),
    },
  ],
});

export default router;
