import Vue from 'vue';
import Router from 'vue-router';
import Reader from './views/Reader.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/reader/1',
    },
    {
      path: '/reader/:id/:shelfSlug?/:sort?',
      name: 'reader',
      component: Reader,
    },
  ],
});
