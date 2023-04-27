import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/base.css';
import axios from 'axios';
import router from './router';
import * as Sentry from '@sentry/vue';
import { UserDummy } from '@/types/User';


const user: UserDummy = {
  uid: '048',
  name: ' Joe',
  email: 'joe@fituapp.com'
};

const app = createApp(App);
Sentry.init({
  app,
  logErrors: true,
  environment: import.meta.env.VITE_SENTRY_ENVIRONMENT,
  release: import.meta.env.__SENTRY_RELEASE__,
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracePropagationTargets: [
        'localhost',
        'benevolent-blini-9d78e2.netlify.app',
        /^\//,
      ],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE,
  replaysSessionSampleRate: import.meta.env
    .VITE_SENTRY_SESSION_REPLAY_SAMPLE_RATE,
  replaysOnErrorSampleRate: import.meta.env
    .VITE_SENTRY_REPLAY_ONERROR_SAMPLE_RATE,
});

Sentry.setUser({
  id: user.uid,
  name: user.name,
  email: user.email,
});

app.config.globalProperties.$http = axios;
app.mount('#app');
