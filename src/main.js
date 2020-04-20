import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import './utils/htmlFontSize'
import './assets/styles/global.scss'
import "@/utils/MostonePayApiT";

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
