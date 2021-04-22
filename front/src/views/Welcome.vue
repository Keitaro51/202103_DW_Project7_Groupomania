<template>
  <header>
    <h2>Bienvenue</h2>
    <router-link :to="{ name: 'Profil', params:{userId : currentUser}}" v-show="!this.$store.state.is_profil_page">
      <Btn class="button" msg="Voir/modifier le profil" />
    </router-link>
     <router-link :to="{ name: 'NewMessage'}" v-show="!this.$store.state.is_newmsg_page"> 
      <Btn class="button" msg="Créer un nouveau message"/>
    </router-link>
    <router-link to="/">
      <Btn class="button" msg="Deconnexion" @click="disconnect"/>
    </router-link>
  </header>
  <router-view/>
</template>

<script>
import Btn from "../components/Button.vue";

export default {
  name: "Welcome",
  components: {
    Btn
  },
  data(){
    return{
      currentUser:parseInt(localStorage.getItem('userId'))
    }
  },
  methods:{
    async disconnect(){
      await fetch(this.$store.state.src + 'user/disconnect',{
        method: "POST",
        headers: {
          'authorization': 'bearer ' + localStorage.getItem('token'),
          'content-type': 'application/json'          
        },
        body: JSON.stringify({userId:parseInt(localStorage.getItem('userId'))})
      });
      localStorage.removeItem('userId')
      localStorage.removeItem('token')
      localStorage.removeItem('userRights')
      localStorage.removeItem('lastTimeConnected')
    }
  }
};
</script>

<style lang="scss">
.button {
  margin: 20px;
}
</style>