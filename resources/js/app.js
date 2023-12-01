import "./bootstrap";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import MenuSidebar from "./components/MenuSidebar.vue";

const app = createApp(App);
app.use(router);
app.component("MenuSideBar", MenuSidebar);
app.mount("#app-vue");
