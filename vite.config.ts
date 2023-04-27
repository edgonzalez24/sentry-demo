import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url';
import svgLoader from 'vite-svg-loader';
import dotenv from 'dotenv';
import viteSentry from 'vite-plugin-sentry';

dotenv.config();
console.log(process.env.VITE_SENTRY_TOKEN);
const viteSentryConfig = {
  authToken: process.env.VITE_SENTRY_TOKEN,
  org: 'personal-lab',
  project: 'sentry-demo',
  release: `${process.env.npm_package_name}@${process.env.npm_package_version}`,
  setCommits: {},
  sourceMaps: {
    include: ['./dist/assets'],
    ignore: ['node_modules'],
    urlPrefix: '~/assets',
  },
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    svgLoader(),
    viteSentry(viteSentryConfig),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    sourcemap: 'hidden',
  },
  define: {
    __SENTRY_RELEASE__: `"${process.env.npm_package_name}@${process.env.npm_package_version}"`,
  },
});
