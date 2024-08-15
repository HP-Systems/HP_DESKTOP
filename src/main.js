import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router';
import pusherPlugin from './plugins/pusher';

createApp(App).use(router).use(pusherPlugin).mount('#app');

