import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",

    component: () => import("../views/About.vue"),
  },
  {
    path: "/heroes",
    name: "heroes",
    component: () => import("@/views/Heroes.vue"),
  },
  {
    path: "/leaderboard",
    name: "leaderboard",
    component: () => import("@/views/Leaderboard.vue"),
  },
  {
    path: "/match-detail/:id",
    name: "/match-detail",
    component: () => import("@/views/MatchDetail.vue"),
  },
  {
    path: "/player-detail/:id",
    name: "/player-detail",
    component: () => import("@/views/PlayerDetail.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
