import 'bootstrap/dist/css/bootstrap.css';
import BootstrapVue from 'bootstrap-vue';
import VueEllipseProgress from 'vue-ellipse-progress';
import Vue from 'vue';
import App from './App.vue';
import router from './router';


Vue.use(VueEllipseProgress);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
