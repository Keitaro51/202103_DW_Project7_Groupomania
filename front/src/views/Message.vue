<template>
  <router-link :to="{ name: 'List', params : {pageId : 1 }}"><Btn msg="Retour à la liste des derniers messages"/></router-link>
  <div class="originalMsg">
    <h3>{{ originMsg.title }} (msgId {{ $route.params.msgId }})</h3>
    <p>Auteur : {{ originMsg.creator_id }} - Date de rédaction: {{ originMsg.creation_date }}</p>
    <!--TODO format date et récup créateur name (fk user tab)-->
    <div class="content">{{ originMsg.content }}</div> 
  <!--TODO affiche les balises html au lieu d'un beau formatage-->
  </div>
</template>

<script>
import Btn from "../components/Button.vue";

export default {
  name: "Message",
  data(){
    return{
      originMsg:{}
    }
  },
  async beforeCreate(){
    let currentMsg = await fetch(this.$store.state.src + 'message/' + this.$route.params.msgId,{
      method: "POST",
      headers: {
        'authorization': 'bearer ' + localStorage.getItem('token'),
        'content-type': 'application/json'          
      },
      body: JSON.stringify({userId:parseInt(localStorage.getItem('userId'))})
    });
    currentMsg = await currentMsg.json();
    this.originMsg = currentMsg.msg;
    //FIXME trouver et afficher réponses
  },
  components:{
    Btn
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