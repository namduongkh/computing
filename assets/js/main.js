import Vue from "vue";
import VueRouter from "vue-router";

import App from "./components/App.vue";

import 'bootstrap';

Vue.use(VueRouter);

new Vue({
  components: {
    App
  },
  template: '<App/>',
  created() { }
}).$mount('#app')
