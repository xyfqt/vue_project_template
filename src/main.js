import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './assets/js/htmlFontSizeNoScale'
import './assets/js/fastClick'
import './components'
import './icons'

import Vant from 'vant';
import 'vant/lib/index.css';

import "./assets/css/global.scss"

Vue.config.productionTip = false;
Vue.use(Vant);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
