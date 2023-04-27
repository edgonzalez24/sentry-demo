import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/base.css';
import axios from 'axios';
import router from './router';
import * as Sentry from '@sentry/vue';


const app = createApp(App);
Sentry.init({
  app,
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE,
});

app.config.globalProperties.$http = axios;
app.mount('#app');
