import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/base.css';
import axios from 'axios';
import * as Sentry from '@sentry/vue';


const app = createApp(App);
Sentry.init({
  app,
  dsn: import.meta.env.VITE_SENTRY_DSN,
});

app.config.globalProperties.$http = axios;
app.mount('#app');
