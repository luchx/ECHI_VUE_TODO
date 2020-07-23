import { createApp } from 'vue';
import App from './App';
import router from './router';
import store from './store';
import components from "./components";

console.log({
  components
});


createApp(App).use(router).use(store).mount('#app');
