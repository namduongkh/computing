import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from 'vuex'
import AppStoreConfig from './services/app_store_config';

import App from "./components/App.vue";

import 'bootstrap';

Vue.use(VueRouter);
Vue.use(Vuex);

new Vue({
  components: {
    App
  },
  store: new Vuex.Store(AppStoreConfig),
  template: '<App/>',
  created() { }
}).$mount('#app')

window.CommonJs = (function () {
  return {
    toggleLoadingWrapper(flag = true) {
      $('.loading-wrapper').toggle(flag);
    }
  }
})()
