<template>
  <h3>Liste des 10 derniers messages</h3>
  <table>
    <tr> 
      <th></th>
      <th>
        Titre du message d'origine
      </th>
      <th>
        Aperçu du message d'origine
      </th>
      <th>
        Createur du message d'origine
      </th>
      <th>
        Dernière modification
      </th>
    </tr>
    <tr v-for="msg of msgList" :key="msg.id" :class="`${msg.id}`">
      <td>
        {{ msg.id }}<!--TODO gestion de la pastille new v-if? si date dernière modif < last connected date-->
      </td>
      <td class="title">
        {{ msg.title }}<!--TODO recupérer titre du parent quand pas de titre (reponse)-->
      </td>
      <td class="content">
        {{ msg.content }}
      </td>
      <td class="creator">
        {{ msg.creator_id }}<!--TODO recupérer nom plutot que l'id-->
      </td>
      <td class="lastdate">
        {{ msg.creation_date }}<!--TODO formater date-->
      </td>
      
      <router-link :to="{ name: 'Message', params: { msgId : msg.id }} "><Btn class="Btn" msg="Voir"/></router-link>
    </tr>
  </table>
</template>

<script>
import Btn from "../components/Button.vue";

export default {
  name: "List",
  components:{
    Btn
  },
  data(){
    return{
      new:true,
      msgList:[]
    }
  },
  async beforeCreate(){
      let lasts = await fetch(this.$store.state.src + 'message/lasts',{
        method: "POST",
        headers: {
          'authorization': 'bearer ' + localStorage.getItem('token'),
          'content-type': 'application/json'          
        },
        body: JSON.stringify({userId:parseInt(localStorage.getItem('userId'))})
      });
      this.msgList = await lasts.json();
      this.msgList = this.msgList.list;
  }
};
</script>

<style lang="scss">
table{
  border-collapse : collapse;
  tr :not(a){
    border:solid 1px black;
    padding:5px;
  }
  .Btn{
    margin:25% 10px 25% 10px;
  }
  width:75%;
  margin:auto
}
</style>