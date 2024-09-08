import { createPinia } from "pinia";
import "@/assets/styles/base.scss";
import { createApp } from "vue";
import App from "./App.vue";


const pinia = createPinia();
const Vue = createApp(App);

Vue.use(pinia);
Vue.mount('#app');
