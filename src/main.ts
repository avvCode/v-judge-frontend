import { createApp } from "vue";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import router from "./router";
import store from "./store";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import "bytemd/dist/index.css";
import ECharts from "vue-echarts"; // 引入ECharts
import "echarts";
createApp(App)
  .use(ArcoVue)
  .use(store)
  .use(router)
  .use(ArcoVueIcon)
  .component("Echarts", ECharts)
  .mount("#app");
