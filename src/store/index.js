/*eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    msg: 'bbb'
  },
  actions: {
    changeType (ctx,index){
      ctx.commit('changeType',index)
    }
  },
  mutations: {
    changeType(state,index){
      state.msg = index
    }
  }
})
