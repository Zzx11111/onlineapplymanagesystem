import Vue from 'vue'
import Vuex from 'vuex'
import {getAdminInfo} from '../config/api'
import {dynamicRouter} from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adminInfo:{}
  },
  mutations: {
    async setMenu(state,data){
      console.log(data)
      state.adminInfo = data
      dynamicRouter()
    }
  },
  actions: {
    async setMenu(context){
      const adminInfo = await getAdminInfo()
      console.log(adminInfo)
      context.commit('setMenu',adminInfo)
    }
  },
  modules: {
  }
})
