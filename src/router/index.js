import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUpView from "../views/SignUpView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    /*{
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },*/
    {
      path: "/sign-up",
      name: "singUp",
      component: SignUpView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/SignUpView.vue"),
    },
    {
      path: "/log-in",
      name: "logIn",

      component: () => import("../views/Login.vue"),
    },
    {
      path: "/create-game",
      name: "createGame",
      component: () => import("../views/CreateGame.vue"),
    },
    {
      path: "/play",
      name: "play",
      component: () => import("../views/PlayView.vue"),
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("../views/Logout.vue"),
    },
    /*
    {
      path: "creategame",
      name: "creategame",

      component: () => import("../views/SignUpView.vue"),
    },
    {},*/
  ],
});

export default router;
