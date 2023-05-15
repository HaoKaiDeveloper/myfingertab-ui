import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "vue-plyr/dist/vue-plyr.css";

loadFonts();
const app = createApp(App);

app.use(store).use(router).use(vuetify).mount("#app");
