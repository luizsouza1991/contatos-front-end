import Vue from 'vue'
import App from './App.vue'
import vueResource from 'vue-resource'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import  env  from '../env.json';
import VueIziToast from "vue-izitoast";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "izitoast/dist/css/iziToast.css";
import VueMask from 'v-mask'

window.axios  = require('axios');

Vue.use(VueMask)
Vue.use(VueIziToast);

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(vueResource)
Vue.config.productionTip = false

axios.defaults.baseURL = `${env.HOST_API ?? window.location.origin}/api`;

new Vue({
  render: h => h(App),
}).$mount('#app')
