<template>
  <h2>CONNEXION</h2>
  <form method="action">
    <div class="connect">
      <label for="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        autofocus
        required
        v-model.lazy="email"
      />
      <label for="password">Mot de passe</label>
      <input
        type="password"
        name="password"
        id="password"
        required
        v-model.lazy="password"
      />
      <Button msg="Connexion" />
    </div>
    <a href="index.html">Mot de passe oublié</a>
  </form>
</template>

<script>
import Button from "./Button.vue";

export default {
  name: "Connect",
  components: {
    Button,
  },
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
    margin: 15px;
  }
}
</style>