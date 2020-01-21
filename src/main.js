import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import VueToast from 'vue-toast-notification';
import VTooltip from 'v-tooltip';
import VueTruncate from 'vue-truncate-filter';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

// Styles
import 'vue-loading-overlay/dist/vue-loading.css';
import 'vue-toast-notification/dist/index.css';
import 'nprogress/nprogress.css';
import '@/assets/css/main.css';

Vue.use(VueClipboard);
Vue.use(VueToast);
Vue.use(VTooltip);
Vue.use(VueTruncate)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
