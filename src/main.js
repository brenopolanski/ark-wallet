import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import Notifications from 'vue-notification';
import VTooltip from 'v-tooltip';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

// Styles
import '@/assets/css/tailwind.css';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(VueClipboard);
Vue.use(Notifications);
Vue.use(VTooltip);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
