import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import * as constants from '@/utils/constants';

// route level code-splitting
// this generates a separate chunk (xyz.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue');
const WalletComponent = () => import(/* webpackChunkName: "wallet" */ '@/views/Wallet.vue');

Vue.use(Router);

function getTitle(title) {
  return `${title} - ${constants.APP_TITLE}`;
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { title: () => getTitle('Home') }
    },
    {
      path: '/wallets/:address',
      name: 'wallet',
      component: WalletComponent,
      meta: { title: route => getTitle('Wallet ' + route.params.address) }
    }
  ]
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  document.title = to.meta.title(to);

  next();
});

router.afterEach(() => {
  NProgress.done(true);
});

export default router;
