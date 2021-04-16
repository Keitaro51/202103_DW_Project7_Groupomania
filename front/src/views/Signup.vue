<template>
  <h2>INSCRIPTION</h2>
  <form method="post" @submit="signup">
    <label for="email">Email</label>
    <input
      type="email"
      name="email"
      id="email"
      autofocus
      required
      pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
      placeholder="email@groupomania.com"
      v-model.lazy="user.email"
      
    />
    <label for="password">Password (min 8 caractères dont 1 nombre)</label>
    <input
      type="text"
      name="password"
      id="password"
      minlength="8"
      pattern='^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'
      required
      placeholder="Choose a password here"
      v-model.lazy="user.password"
    />
    <label for="confirm">Confirmez votre mot de passe</label>
    <input
      type="text"
      name="confirm"
      id="confirm"
      minlength="8"
      pattern='^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'
      required
      placeholder="Repeat your password here"
      v-model.lazy="confirmPassword"
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
    <select  name="department" v-model="user.department" required> <!--TODO créer composant liste reutilisable-->
      <option value="">Choisissez votre service</option>
      <option v-for="department of departments" :key="department.id" :value="department.id">{{ department.name }}</option> 
    </select>
    <Btn msg="S'inscrire" />
  </form>
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
      departments:[],
      confirmPassword:""
    }
  },
  async beforeCreate(){
      let list = await fetch(this.$store.state.src + "user/departmentList")
      this.departments = await list.json();
      this.departments = this.departments.departments;//TODO tenter de regrouper le 2 lignes en une seule plutot que réaffecter 2x la variable
      //TODO lier au state pour réutilisation de la liste dans profil
  },
  methods: {
    async signup(e) {
      e.preventDefault();
      e.stopPropagation();
      if(this.user.password === this.confirmPassword){
        let userinfo = await fetch(this.$store.state.src + "auth/sign", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(this.$data.user)
        })
        if(userinfo.ok == true){
          userinfo = await userinfo.json();
          this.$router.push({ name: 'Login' })
        }else{
          alert('Veuillez remplir tous les champs!')
        }
      }else{
        alert('Veuillez entrer 2 mots de passe identiques dans le champ de confirmation')
      }
    } 
  }
}

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
  input:focus, select:focus{
    outline: none;
    border: 2px solid black;
  }
}
</style>