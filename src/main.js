import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './assets/js/htmlFontSizeNoScale'
import './assets/js/fastClick'
import './components'
import './icons'
import * as filters from '@/utils/filter'

import Vant from 'vant';
import 'vant/lib/index.css';

import "./assets/css/global.scss"

Vue.config.productionTip = false;
Vue.use(Vant);

window.initUserInfoToFenBei = function (uid, token,version) {
  console.log(uid,token,version)
  localStorage.setItem('userInfo', JSON.stringify({
    uid: uid,
    token: token,
  }))
  return "success"
}
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "倍优惠，倍赚钱";
  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
