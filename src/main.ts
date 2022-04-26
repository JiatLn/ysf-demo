import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { initStore } from '@/app/initStore';

import 'uno.css';
import '@unocss/reset/tailwind.css';
import '@purge-icons/generated';
import '@/assets/styles/_global.scss';

import { Tabbar, TabbarItem, Button, Toast } from 'vant';

import './assets/js/upsdk.js';

// import vueCupUi from 'vue-cup-ui/lib/vue-cup-ui.umd.js';
// import 'vue-cup-ui/lib/vue-cup-ui.css';

const app = createApp(App);
const pinia = createPinia();

app.use(router).use(pinia); // .use(vueCupUi);

app.use(Tabbar).use(TabbarItem).use(Button).use(Toast);

app.mount('#app');

initStore();
