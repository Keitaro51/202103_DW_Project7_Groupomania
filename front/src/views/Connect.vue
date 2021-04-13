<template>
  <h2>CONNEXION</h2>
  <form method="post">
    <div class="connect">
      <label for="email">Email</label>
      <!-- TODO required marchent pas -->
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
      <Btn msg="Connexion" @click="login" />
      <a href="#" @click="forgot">Mot de passe oublié</a>
      <hr />
      <p>Pas encore de compte?</p>
      <router-link to="/signup"><Btn msg="Créer un compte" /></router-link>
      <!-- TODO reouter link devient btn dans a et pas a dans btn. CSS, cibler router_link ou a virtuel?-->
    </div>
  </form>
</template>

<script>
import Btn from "../components/Button.vue";

export default {
  name: "Connect",
  components: {
    Btn,
  },
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    async forgot() {
      let reinit = await fetch(this.$store.state.src + "auth/forgot", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: this.$data.email }),
      });
      if (reinit.ok == true) {
        reinit = await reinit.json();
        this.$router.push({ name: "Reinit" });
      } else {
        alert("Email non trouvé ou manquant !");
      }
    },

    async login() {
      let login = await fetch(this.$store.state.src + "auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: this.$data.email,
          password: this.$data.password,
        }),
      });
      if (login.ok == true) {
        login = await login.json();//TODO parsint à l'enregistrement plutot qu'au getitem
        localStorage.setItem("userId", login.userId); //TODO localStorage ou $store.state?
        localStorage.setItem("userRights", login.userRights); //TODO regrouper les setItem en une commande?
        localStorage.setItem("token", login.token);
        this.$router.push({ name: "List" });//TODO fonctionne si email est n'a pas un format email (test OK / test@test.fr NOK (mais api fait le taf))
      } else {
        alert("Email / mot de passe érroné ou manquant !");
      }
    }
  }
};
</script>

<style lang="scss">
form {
  width: 50%;
  margin: auto;
}
.connect {
  padding: 0 15px 0 15px;
  border: solid black 2px;
  display: flex;
  flex-direction: column;
  :nth-child(odd) {
    margin: 10px;
  }
}
</style>