import { createWebHistory, createRouter } from "vue-router";

import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Store from "../pages/Store.vue";
import Pos from "../pages/Pos.vue";
import Transaction from "../pages/Transaction.vue";
import Report from "../pages/Report.vue";
import NoPage from "../pages/NoPage.vue";

//middleware
import { useStore } from "../store/auth";

const authMiddleware = (to, from, next) => {
    const token = localStorage.getItem("web_token");
    const user = localStorage.getItem("web_user");
    const store = useStore();

    if (!token) {
        next({
            path: "/login",
            replace: true,
        });
    } else {
        store.set_token(token);
        store.set_user(user);
        next();
    }
};

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
        meta: {
            middleware: [authMiddleware],
        },
    },
    {
        name: "pos",
        path: "/pos",
        component: Pos,
        meta: {
            middleware: [authMiddleware],
        },
    },
    {
        name: "transaction",
        path: "/transaction",
        component: Transaction,
        meta: {
            middleware: [authMiddleware],
        },
    },
    {
        name: "report",
        path: "/report",
        component: Report,
        meta: {
            middleware: [authMiddleware],
        },
    },
    {
        name: "no_page",
        path: "/:pathMatch(.*)*",
        component: NoPage,
        meta: {
            middleware: [authMiddleware],
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    scrollBehavior() {
        window.scrollTo;
    },
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("web_token");

    if (to.meta.middleware) {
        to.meta.middleware.forEach((middleware) => middleware(to, from, next));
    } else {
        if (to.path == "/login" || to.path == "/") {
            if (token) {
                next({
                    path: "/store",
                    replace: true,
                });
            } else {
                next();
            }
        } else {
            next();
        }
    }
});

export default router;
