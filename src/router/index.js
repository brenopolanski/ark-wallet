import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/wallet',
    name: 'wallet',
    // route level code-splitting
    // this generates a separate chunk (wallet.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: 'wallet' */ '../views/Wallet.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
