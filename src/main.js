import './assets/main.css';
import { createApp } from 'vue';
import piniaPersist from 'pinia-plugin-persist';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createPinia } from 'pinia';
import router from './router';

const pinia = createPinia()
pinia.use(piniaPersist);
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount('#app');