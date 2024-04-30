import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/index.css'; // Assuming your Tailwind config is in the root directory

const app = createApp(App);

app.use(router);

app.mount('#app');