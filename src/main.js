// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import PrimeVue from "primevue/config";

Vue.config.productionTip = false;

/* eslint-disable no-new */

import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons

new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
  PrimeVue
});
