<template>
  <div id="sitemap">
      <ul>
          <li>
              <router-link :to="{ name: 'Login'}" aria-label="lien vers la page de connexion" >Se connecter</router-link>
          </li>
          <li>
              <router-link :to="{ name: 'Signup'}" aria-label="lien vers la page de création de compte">Créer un compte</router-link>
          </li>
          <li v-if="currentUser">
              <router-link :to="{ name: 'Profil', params:{userId : currentUser}}" aria-label="lien vers votre profil">Profil</router-link>
          </li>
          <li v-if="currentUser">
              <router-link :to="{ name: 'List', params : {pageId : 1 }}" aria-label="lien vers la liste des derniers messages">Derniers messages</router-link>
          </li>
          <li v-if="currentUser">
              <router-link :to="{ name: 'NewMessage'}" aria-label="lien vers la page de création de message">Nouveau message</router-link>
          </li>
          <li>
              <router-link :to="{ name: 'not-found'}" aria-label="lien vers la page d'erreur 404, si vous ne recherchez rien">Page 404 (si vous ne recherchez rien)</router-link>
          </li>
      </ul>
      <Btn msg="Retour" @click="redirect" />
  </div>
</template>

<script>
import Btn from "../components/Button.vue";

export default {
  name: "Sitemap",
  components: {
    Btn,
  },
  data(){
      return{
          currentUser: parseInt(localStorage.getItem('userId'))
      }
  },
  methods:{
    redirect(){
        (!localStorage.getItem('token')) ? this.$router.push({ name: 'Login' }) : this.$router.push({ name: 'List', params : {pageId : 1 }})
    }
  }
}
</script>

<style>

</style>
