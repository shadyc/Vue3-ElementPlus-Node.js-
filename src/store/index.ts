import { createStore } from 'vuex'


export default createStore({
  state: {
    vuexdata: 178
  },
  mutations: {
    changeData(state){
          state.vuexdata = 321
    }
  },
  actions: {
    changeAbc(context){
      setTimeout(() => {
        context.commit("changeData")
      }, 1000);
    }
  },
  modules: {
  }
})
