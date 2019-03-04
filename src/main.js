// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import app from './app'
import router from './router'
import './assets/styles/reset.css'
import './assets/styles/rem.js'
import './assets/styles/iconfont/iconfont.css'
import global from './pages/common/Global.vue'
import store from './store'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import * as filters from './assets/js/filters.js'

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(Vuex)
Vue.prototype.global = global
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { app },
  template: '<app/>',
  render: h => h(app)
})
