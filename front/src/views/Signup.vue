<template>
    <h2>INSCRIPTION</h2>
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
    <router-link to="/home/list"><Btn msg="S'inscrire" /></router-link>
    <!--TODO routeur link crée un <a> beaucoup trop large - ex:signup page desktop, zone cliquable enorme-->
</template>

<script>
import Btn from "../components/Button.vue";

export default {
  name: "SignupForm",
  components: {
    Btn,
  },
};
</script>

<style lang="scss">
form {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  label,
  input,
  select {
    margin: 20px 20px 0 20px;
  }
}
</style>