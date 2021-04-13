<template>
    <h3>Profil</h3>
    <p>Membre depuis le : {{ profil.creation_date }}</p>
    <form method="post">
      <label for="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        autofocus 
        required
        placeholder="email@groupomania.com"
        v-model.lazy="profil.email"
      />
      <!--TODO autofocus marche pas Autofocus processing was blocked because a document's URL has a fragment '#/home/profil'.-->
      <label for="firstname">Prénom</label>
      <input
        type="text"
        name="firstname"
        id="firstname"
        required
        placeholder="Jean Eude"
        v-model.lazy="profil.firstname"
      />
      <label for="lastname">Nom</label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        required
        placeholder="Gonzales"
        v-model.lazy="profil.lastname"
      />
      <label for="department">Département</label>
      <select name="department">
        <option value="">Choisissez votre service</option> 
        <option value="Choix1">Choix1</option>
      </select>
      <!-- TODO préremplir avec le département actuel et rappeler/généraliser la fonction de création de liste dprt-->
    </form>
    <router-link to="/home/list"><Btn msg="Annuler" /></router-link>
    <Btn msg="Enregistrer" @click="save"/>
    <Btn msg="Supprimer le profil" @click="deleteProfil"/>
</template>

<script>
import Btn from "../components/Button.vue";
export default {
  name: "Profil",
  components:{
      Btn
  },
  data(){
    return{
      profil:{}
    }
  },
  async beforeCreate(){
      this.$store.dispatch('isprofilpage') 
      let response = await fetch(this.$store.state.src + 'user/' + this.$route.params.userId,{
      method: "POST",
      headers: {
        'authorization': 'bearer ' + localStorage.getItem('token'),
        'content-type': 'application/json'          
      },
      body: JSON.stringify({userId:parseInt(localStorage.getItem('userId'))})
    });
    response = await response.json();
    this.profil = response.profil;
  },
  unmounted(){
      this.$store.dispatch('isprofilpage')
  },
  methods:{
    async deleteProfil(){
      await fetch(this.$store.state.src + 'user/delete/' + this.$route.params.userId,{
        method:"DELETE",
        headers:{
          'authorization': 'bearer ' + localStorage.getItem('token'),
          'content-type': 'application/json'          
      },
      body: JSON.stringify({userId:parseInt(localStorage.getItem('userId')), userRights:parseInt(localStorage.getItem('userRights'))})
    });
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      localStorage.removeItem('userRights');
      this.$router.push({ name: "Login" });
    },

    async save(){

    }

  }
};
</script>

<style lang="scss">
</style>