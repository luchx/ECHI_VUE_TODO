import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';

import VueCompositionApi from '@vue/composition-api';

console.log(process.env.NODE_ENV)

Vue.use(VueCompositionApi);

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
