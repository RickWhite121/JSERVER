import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUser, faGear, faClock, faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(VueAxios, axios);
library.add(faUser, faGear, faClock, faTrashCan);
Vue.component('font-awesome-icon', FontAwesomeIcon); // 使用kebab-case

new Vue({
  render: (h) => h(App),
}).$mount('#app');
