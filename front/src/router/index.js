import { createRouter, createWebHashHistory } from 'vue-router'
import Connect from '../views/Connect.vue'
import Signup from '../views/Signup.vue'
import Reinit from '../views/Reinit.vue'
import Welcome from '../views/Welcome.vue'
import Profil from '../views/Profil.vue'
import List from '../views/List.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Connect
  },
  {
    path: '/signup',
    name: 'Inscription',
    component: Signup
  }, {
    path: '/reinit',
    name: 'Reinitialisation',
    component: Reinit
  }, {
    path: '/home',
    name: 'Welcome',
    component: Welcome,
    children: [{
      path: 'list',
      component: List
    },{
      path: 'profil',
      component: Profil
    }]
  }
  // ,{
  //   path: '*',
  //   redirect: '/'
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
