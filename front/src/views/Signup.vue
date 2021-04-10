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
      v-model.lazy="user.email"
    /><!--TODO les required ne marchent pas. La faute au submit?-->
    <label for="password">Password</label>
    <input
      type="password"
      name="password"
      id="password"
      required
      placeholder="Choose a password here"
      v-model.lazy="user.password"
    />
    <label for="firstname">Prénom</label>
    <input
      type="text"
      name="firstname"
      id="firstname"
      required
      placeholder="Jean Eude"
      v-model.lazy="user.firstname"
    />
    <label for="lastname">Nom</label>
    <input
      type="text"
      name="lastname"
      id="lastname"
      required
      placeholder="Gonzales"
      v-model.lazy="user.lastname"
    />
    <label for="department">Département</label>
    <select name="department" v-model="user.department"> <!--TODO créer composant liste reutilisable-->
      <option value="">Choisissez votre service</option>
      <option v-for="department of departments" :key="department.id" :value="department.id">{{ department.name }}</option> 
      
    </select>
  </form>
  <!-- <router-link to="/"> -->
    <Btn msg="S'inscrire" @click="signup"/>
  <!-- </router-link> -->
</template>

<script>
import Btn from "../components/Button.vue";

export default {
  name: "SignupForm",
  components: {
    Btn,
  },
  data(){
    return {
      user:{
        email:null,
        firstname: null,
        lastname: null,
        department:null,
        password: null
      },
      departments:[]
    }
  },
  async beforeCreate(){
      let list = await fetch(this.$store.state.src + "user/departmentList")
      this.departments = await list.json();
      this.departments = this.departments.departments;//TODO tenter de regrouper le 2 lignes en une seule plutot que réaffecter 2x la variable
      //TODO lier au state pour réutilisation de la liste dans d'autres views
  },
  methods: {
    async signup() {
      let userinfo = await fetch(this.$store.state.src + "auth/sign", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(this.$data.user)
      })
      if(userinfo.ok == true){
        userinfo = await userinfo.json();
        this.$router.push({ name: 'Login' }) //TODO ou router.go(n)? pas reussit à faire de preventdefault pour empecher le routage
      }else{
        alert('Veuillez remplir tous les champs!')
      }
    },
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