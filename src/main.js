// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import "babel-polyfill";
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
router.beforeEach((to, from, next) => {
  if(to.fullPath == "/"){
     next();
  }else{
    let USERTYPE = localStorage.getItem('userTypeBig');
    // 用户类型1系统管理员  2：B (平台)管理员 0: 大后台管理员
    if(USERTYPE == 2){
       next({path:'/'})
    }else if(USERTYPE == 1){
      if(to.redirectedFrom == "/superAdmin"){
        next()
      }else{
        next({path:'/superAdmin',replace: true})
      }
    }else if(USERTYPE == 0){
      if(to.fullPath == "/superAdmin/adminList"){
        next({path:from.fullPath,replace: true})
      }else{
        next()
      }
    }else{
      next()
    }
  }
});
new Vue({
  el: '#app',
  store,
  router,
  components: { app },
  template: '<app/>',
  render: h => h(app)
})
