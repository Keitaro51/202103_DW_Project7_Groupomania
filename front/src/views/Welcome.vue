<template>
  <header>
    <h2>Bienvenue Jean Eude</h2>
    <router-link to="/home/profil"> <!--TODO retirer quand view profil active-->
      <Btn class="button" msg="Voir/modifier le profil" />
    </router-link>
     <router-link to="/home/message/new"> <!--TODO retirer quand view new message active-->
      <Btn class="Btn" msg="Créer un nouveau message"/>
    </router-link>
    <router-link to="/">
      <Btn class="button" msg="Deconnexion" />
    </router-link>
  </header>
  <router-view/>
  <router-view name="Profil" />
  <router-view name="List" /> <!-- TODO à quoi servent ces router view? newmessage marche même sans-->
</template>

<script>
import Btn from "../components/Button.vue";

export default {
  name: "Welcome",
  components: {
    Btn
  }
};
</script>

<style lang="scss">
.button {
  margin: 20px;
}
</style>