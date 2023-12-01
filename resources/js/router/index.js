import { createWebHistory, createRouter } from "vue-router";

import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Store from "../pages/Store.vue";
import Pos from "../pages/Pos.vue";
import Transaction from "../pages/Transaction.vue";
import Report from "../pages/Report.vue";
import NoPage from "../pages/NoPage.vue";

export const routes = [
    {
        path: "/",
        redirect: "/store",
    },
    {
        name: "login",
        path: "/login",
        component: Login,
    },
    {
        name: "register",
        path: "/register",
        component: Register,
    },
    {
        name: "store",
        path: "/store",
        component: Store,
    },
    {
        name: "pos",
        path: "/pos",
        component: Pos,
    },
    {
        name: "transaction",
        path: "/transaction",
        component: Transaction,
    },
    {
        name: "report",
        path: "/report",
        component: Report,
    },
    {
        name: "no_page",
        path: "/:pathMatch(.*)*",
        component: NoPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    scrollBehavior() {
        window.scrollTo;
    },
});

export default router;
