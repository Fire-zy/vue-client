import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './http'
import * as Echarts from 'echarts'
import VSwatches from 'vue-swatches'

// Import the styles too, typically in App.vue or main.js
import 'vue-swatches/dist/vue-swatches.css'
Vue.prototype.$echarts = Echarts

Vue.use(VSwatches);
Vue.use(ElementUI);


Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
