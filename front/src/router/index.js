import { createRouter, createWebHistory } from 'vue-router'
import Connect from '../views/Connect.vue'
import Signup from '../views/Signup.vue'
import Reinit from '../views/Reinit.vue'
import Welcome from '../views/Welcome.vue'
import Profil from '../views/Profil.vue'
import List from '../views/List.vue'
import Message from '../views/Message.vue'
import NewMessage from '../views/NewMessage.vue'
import NotFound from '../views/NotFound.vue'
import Sitemap from '../views/Sitemap.vue'

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
    path: '/sitemap',
    name: 'Sitemap',
    component: Sitemap
  }, {
    path: '/home',
    name: 'Welcome',
    component: Welcome,
    children: [{
      path: 'list/:pageId',//TODO regex sur pageId
      name:"List",
      component: List
    },{
      path: 'profil/:userId',//TODO regex sur userId
      name:"Profil",
      component: Profil
    },{
      path: 'message/:msgId',//TODO regex sur msgId
      name: "Message",
      component: Message      
    },{
      path: 'message/new',
      name: "NewMessage",
      component: NewMessage      
    },{
      path: 'message/modify/:msgId',
      name : "Modify",
      component: NewMessage
    }]
  },{ path: '/:pathMatch(.*)*', 
      name: 'not-found', 
      component: NotFound 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
