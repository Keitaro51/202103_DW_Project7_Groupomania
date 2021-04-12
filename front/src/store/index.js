import { createStore } from 'vuex'

export default createStore({
  state: {
    src:"http://localhost:3000/api/",
    is_profil_page:false
  },
  mutations: {
    ISPROFILPAGE(state){
        state.is_profil_page=!state.is_profil_page
    }
  },
  actions: {
    isprofilpage(context){
      context.commit('ISPROFILPAGE')
    }
  },
  modules: {
  }
})
