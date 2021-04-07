<template>
  <header>
    <h2>Bienvenue Jean Eude</h2>
    <router-link to="/home/profil">
      <Btn class="button" msg="Voir/modifier le profil" />
    </router-link>
    <router-link to="/">
      <Btn class="button" msg="Deconnexion" />
    </router-link>
  </header>
  <router-view />
  <router-view name="profil" />
  <router-view name="list" />
</template>

<script>
import Btn from "../components/Button.vue";

export default {
  name: "Welcome",
  components: {
    Btn,
  },
};
</script>

<style lang="scss">
.button {
  margin: 20px;
}
</style>