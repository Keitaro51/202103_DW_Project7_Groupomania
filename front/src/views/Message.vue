<template>
  <router-link :to="{ name: 'List', params : {pageId : 1 }}"><Btn msg="Retour à la liste des derniers messages"/></router-link>
  <div class="originalMsg">
    <h3>{{ originMsg.title }}</h3>
    <p>Auteur : {{ originMsg.creator_id }} - Date de rédaction: {{ originMsg.creation_date }}</p>
    <!--TODO format date et récup créateur name (fk user tab)-->
    <!--TODO s'assurer que l'on répond au message d'origine et non à la réponse-->
    <div class="content">
      {{ originMsg.content }}<br>
      <hr>
      <router-link :to="{ name: 'NewMessage', query:{ responseTo : originMsg.id}}"><Btn msg="Répondre"/></router-link>
      <router-link :to="{ name: 'Modify', query:{ id : originMsg.id, title : originMsg.id, content : originMsg.content}}"><Btn msg="Modifier"/></router-link>
    <!--FIXME bouton modifier query ok pour envoyer à page modify?-->
    </div> 
  <!--TODO affiche les balises html au lieu d'un beau formatage-->
  </div>
  <div v-if="responses.length>0" class="responses">
    <p v-for="(response, index) in responses" :key="index"> {{ response }}</p>
  </div>
</template>

<script>
import Btn from "../components/Button.vue";

export default {
  name: "Message",
  components:{
    Btn
  },
  data(){
    return{
      originMsg:{},
      responses:[],
    }
  },
  async beforeCreate(){
    
    let tmp = this.$route.query.parentMsg
    
    if(this.$route.query.parentMsg==null){
      tmp = this.$route.params.msgId
    }
    
    //récupère message d'origine
    let parentMsg = await fetch(this.$store.state.src + 'message/' + tmp,{
      method: "POST",
      headers: {
        'authorization': 'bearer ' + localStorage.getItem('token'),
        'content-type': 'application/json'          
      },
      body: JSON.stringify({userId:parseInt(localStorage.getItem('userId'))})
    });
    parentMsg = await parentMsg.json();
    this.originMsg = parentMsg.msg;
    
    //récupère tableau de réponses
    let responseList = await fetch(this.$store.state.src + 'message/responses/' + tmp,{ //FIXME si tmp:"" dans data, this.tmp perd sa valeur ici
      method: "POST",
      headers: {
        'authorization': 'bearer ' + localStorage.getItem('token'),
        'content-type': 'application/json'          
      },
      body: JSON.stringify({userId:parseInt(localStorage.getItem('userId'))})
    });
    responseList = await responseList.json()
    this.responses = responseList.list
  }
};
</script>

<style lang="scss">
.originalMsg{
  text-align: left;
  width: 75%;
  margin:auto;
  .content{
    margin:0;
    border:solid black 1px;
    padding: 20px;
    
  }
}
</style>