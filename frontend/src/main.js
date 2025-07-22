import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import scrollFadeRight from './utils/scrollFadeRight'

const app = createApp(App);

app.directive('scroll-fade-right', scrollFadeRight);
app.use(createPinia());
app.use(router);

app.mount('#app');
