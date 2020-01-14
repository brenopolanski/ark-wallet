import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueClipboard from 'vue-clipboard2';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import '@/assets/css/tailwind.css';

library.add(faUserSecret);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VueClipboard);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
