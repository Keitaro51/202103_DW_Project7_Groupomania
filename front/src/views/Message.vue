<template>
  <router-link :to="{ name: 'List', params : {pageId : 1 }}"><Btn msg="Retour à la liste des derniers messages"/></router-link>
  <div class="originalMsg">
    <h3>{{ originMsg.title }}</h3>
    <p>Auteur :  {{ fullname(originCreatorInfo.firstname, originCreatorInfo.lastname) }} - Date de rédaction: {{ displayedDate(originMsg.creation_date) }}</p>
    <div class="content" >
      <span v-html="originMsg.content"/><br>
      <hr>
      <router-link :to="{ name: 'NewMessage', query:{ responseTo : originMsg.id}}" ><Btn msg="Répondre" /></router-link>
      <router-link :to="{ name: 'Modify', params:{msgId : originMsg.id}, query:{ creatorId: originMsg.creator_id ,title : originMsg.title, content : originMsg.content}}"><Btn msg="Modifier" v-if="allowAction(originMsg.creator_id)"/></router-link>
      <Btn msg="Supprimer" @click="deleteMsg(originMsg.id, originMsg.creator_id)" v-if="allowAction(originMsg.creator_id)"/>
    </div> 
  </div>
  <h4>Réponses ({{ responses.length }})</h4>
  <div v-if="responses.length>0" class="responses">
    <div v-for="(response, index) in responses" :key="index" class="response">
      <span v-html="response.content"/>
      <hr>
      <p> Auteur : {{ fullname(response.User.firstname, response.User.lastname) }} - Date de rédaction :{{ displayedDate(response.creation_date) }}</p>
      <router-link :to="{ name: 'Modify', params:{msgId : response.id}, query:{ responseTo: true, creatorId: response.creator_id , content : response.content}}"><Btn msg="Modifier" v-if="allowAction(response.creator_id)"/></router-link>
      <Btn msg="Supprimer" @click="deleteMsg(response.id, response.creator_id)" v-if="allowAction(response.creator_id)"/>
    </div>
  </div>
</template>

<script>
import Btn from "../components/Button.vue";
import formatDate from "../tools";

export default {
  name: "Message",
  components:{
    Btn
  },
  data(){
    return{
      originMsg:{},
      originCreatorInfo:"",
      responses:[]
    }
  },
  methods:{
    displayedDate(dateToFormat){
      return formatDate(dateToFormat)//FIXME onligé de créer une methode pour appeler la methode importée? relou?
    },
    //autorise l'affichage ou non de certains boutons selon l'utilisateur log / createur du message ou status modérateur
    allowAction(id){
      let allow = ((id == localStorage.getItem('userId')) || (localStorage.getItem('userRights') == (2||3) )) ? true : false
      return allow
    },
    async deleteMsg(msgId, creatorId){
      await fetch (this.$store.state.src + 'message/',{
        method: "DELETE",
        headers: {
          'authorization': 'bearer ' + localStorage.getItem('token'),
          'content-type': 'application/json'          
        },
        body: JSON.stringify({userId:parseInt(localStorage.getItem('userId')), msgCreatorId: creatorId, messageId: msgId})
      })
      .then(response=>{ //FIXME plus simple pour gestion d'erreur? then et await at ame time? try catch?
        (response.ok) ? (this.$router.push({ name: 'List', params : {pageId : 1 }})) : alert('Action non authorisée')
      })
    },
    fullname(firstname, lastname){
      let concat = firstname +' '+ lastname
      return concat
    }
  },
  async beforeCreate(){
    //analyse url pour préparer le fetch (message et reponses)
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
    this.originCreatorInfo = this.originMsg.User;
    
    //récupère tableau de réponses
    let responseList = await fetch(this.$store.state.src + 'message/responses/' + tmp,{ //FIXME si tmp:"" dans data, this.tmp perd sa valeur ici
      method: "POST",
      headers: {
        'authorization': 'bearer ' + localStorage.getItem('token'),
        'content-type': 'application/json'          
      },
      body: JSON.stringify({userId:parseInt(localStorage.getItem('userId'))})
    });
    responseList = await responseList.json();
    this.responses = responseList.list;
  }
};
</script>

<style lang="scss">
input{
  margin-right:10px;
}
.originalMsg, .responses {
  text-align: left;
  width: 75%;
  margin:40px auto;
  .content,{
    margin:0;
    border:solid black 1px;
    padding: 20px;
  }
}
.response{
  margin : 50px auto;
  margin:0 auto 10px auto;
  border:solid black 1px;
  padding:20px;
  p{
    margin:0 0 10px 0;
  }
}
</style>