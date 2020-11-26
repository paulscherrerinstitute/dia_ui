import Vue from 'vue';
import Router from 'vue-router';
import Dia from './components/Dia.vue';
import Ping from './components/Ping.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Dia',
      component: Dia,
    },
    {
      path: '/ping',
      name: 'Ping',
      component: Ping,
    },
  ],
});
