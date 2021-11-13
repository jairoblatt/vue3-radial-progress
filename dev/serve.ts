import { createApp } from "vue";
import Dev from "./serve.vue";
import "../demo/src/assets/style.css";

const app = createApp(Dev);
app.mount("#app");
