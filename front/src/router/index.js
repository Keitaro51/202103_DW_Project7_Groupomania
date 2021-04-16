import { createRouter, createWebHashHistory } from 'vue-router'
import Connect from '../views/Connect.vue'
import Signup from '../views/Signup.vue'
import Reinit from '../views/Reinit.vue'
import Welcome from '../views/Welcome.vue'
import Profil from '../views/Profil.vue'
import List from '../views/List.vue'
import Message from '../views/Message.vue'
import NewMessage from '../views/NewMessage.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Connect
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  }, {
    path: '/reinit',
    name: 'Reinit',
    component: Reinit
  }, {
    path: '/home',
    name: 'Welcome',
    component: Welcome,
    children: [{
      path: 'list/:pageId',
      name:"List",
      component: List
    },{
      path: 'profil/:userId',
      name:"Profil",
      component: Profil
    },{
      path: 'message/:msgId',
      name: "Message",
      component: Message      
    },{
      path: 'message/new',
      name: "NewMessage",
      component: NewMessage      
    }]
  },{ path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }, 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
