<template>
    <h3>Profil</h3>
    <form method="post">
      <label for="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        autofocus
        required
        placeholder="email@groupomania.com"
        v-model.lazy="email"
      />
      <label for="firstname">Prénom</label>
      <input
        type="text"
        name="firstname"
        id="firstname"
        required
        placeholder="Jean Eude"
        v-model.lazy="Prénom"
      />
      <label for="lastname">Nom</label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        required
        placeholder="Gonzales"
        v-model.lazy="Nom"
      />
      <label for="department">Département</label>
      <select name="department">
         <option value="">Choisissez votre service</option> 
        <option value="Choix1">Choix1</option>
        <option value="Choix2">Choix1</option>
      </select>
    </form>
    <router-link to="/home/list"><Btn msg="Enregistrer" /></router-link>
</template>

<script>
import Btn from "../components/Button.vue";
export default {
  name: "Profil",
  data() {
    return {
		profil:true
		};
  },
  components:{
      Btn
  }
};
</script>

<style lang="scss">
</style>