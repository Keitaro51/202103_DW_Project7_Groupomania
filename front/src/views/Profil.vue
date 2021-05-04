<template>
    <h3>Profil</h3>
    <p>Membre depuis le : {{ profil.creation_date }}</p>
    <p class="updatedProfil" v-if="updated">Profil enregistré</p>
    <form method="post" @submit="saveProfil" aria-label="formulaire de visualisation / modification de mot de passe">
      <label for="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        autofocus 
        required
        placeholder="email@groupomania.com"
        v-model.lazy="profil.email" 
        aria-label="Email associé au profil"
      /><!--TODO changement instant malgré lazy-->
      <label for="firstname">Prénom</label>
      <input
        type="text"
        name="firstname"
        id="firstname"
        required
        placeholder="profil.firstname"
        v-model.lazy="profil.firstname"
        aria-label="Prénom associé au profil"
      />
      <label for="lastname">Nom</label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        required
        placeholder="Gonzales"
        v-model.lazy="profil.lastname"
        aria-label="Nom associé au profil"
      />
      <label for="department">Département</label>
      <select name="department" v-model.lazy="profil.department" aria-label="liste déroulante des différents départements">
        <option value="">Choisissez votre service</option> 
        <option v-for="department of departments" :key="department.id" :value="department.id">{{ department.name }}</option> 
      </select>
      <!-- TODO rappeler/généraliser la fonction de création de liste dprt-->
      <Btn msg="Enregistrer" aria-label="Bouton d'enregistrement des modifications apportées au profil"/>
    </form>
    <router-link :to="{ name: 'List', params: {pageId : 1}}" aria-label="lien de retour à la liste des messages, sans enregistrement des modifications du profil"><Btn msg="Annuler"/></router-link>
    <Btn msg="Supprimer le profil" @click="deleteProfil" aria-label="Bouton de suppression du profil avec confirmation requise"/>    
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
      profil:{},
      departments:[],
      updated:false
    }
  },
  async beforeCreate(){
    //cache le bouton profil
    this.$store.dispatch('isprofilpage') 
    
    //importe la liste de départements pour le select
    let list = await fetch(this.$store.state.src + "user/departmentList")
      this.departments = await list.json();
      this.departments = this.departments.departments;

    //récupère les info de profil avant création de la page
    let response = await fetch(this.$store.state.src + 'user/' + parseInt(localStorage.getItem('userId')),{
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
      if(confirm('Cette action est irréverssible. Voulez vous vraiment supprimer votre profil?')){
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
      }
    },
    async saveProfil(e){
      e.preventDefault()
      e.stopPropagation()
      await fetch(this.$store.state.src + 'user/' + parseInt(localStorage.getItem('userId')),{
        method:"PATCH",
        headers:{
          'authorization': 'bearer ' + localStorage.getItem('token'),
          'content-type': 'application/json'          
          },
        body: JSON.stringify({
          userId:parseInt(localStorage.getItem('userId')),
          new_email: this.profil.email,
          new_firstname: this.profil.firstname,
          new_lastname: this.profil.lastname,
          new_department: this.profil.department
        })
      });
      this.updated = true;
      setTimeout(()=>{  this.updated = false; }, 3000);
    }

  }
};
</script>

<style lang="scss">
.updatedProfil{
  color: red;
}
</style>