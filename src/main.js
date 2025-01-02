import "typeface-roboto";

import App from "./App.vue";

import { createApp } from "vue";

import { registerPlugins } from "@/plugins";

import i18n from "./i18n";

const app = createApp(App);

i18n.setup();
app.use(i18n.vueI18n);

registerPlugins(app);

app.mount("#app");
