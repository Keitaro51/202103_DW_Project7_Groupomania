<template>
  <h2>CONNEXION</h2>
  <form method="post">
    <div class="connect">
      <label for="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        autofocus
        required
        placeholder="my awesome email here"
        v-model.lazy="email"
      />
      <label for="password">Mot de passe</label>
      <input
        type="password"
        name="password"
        id="password"
        required
        placeholder="my super password here"
        v-model.lazy="password"
      />
      <router-link to="/home/list"><Btn msg="Connexion" /></router-link>
      <router-link to="/reinit">Mot de passe oublié</router-link>
      <hr>
      <p>Pas encore de compte?</p>
      <router-link to="/signup"><Btn msg="Créer un compte" /></router-link>
    </div>
  </form>
</template>

<script>
import Btn from "../components/Button.vue";

export default {
  name: "Connect",
  components: {
    Btn
  }
};
</script>

<style lang="scss">
form {
  width: 50%;
  margin: auto;  
}
.connect {
  padding:0 15px 0 15px;
  border:solid black 2px;
  display: flex;
  flex-direction: column;
  :nth-child(odd){
    margin: 10px;
  }
}
</style>