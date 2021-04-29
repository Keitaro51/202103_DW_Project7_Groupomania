<template>
  <p>Reminder format response {{ responses }}</p>
  <router-link :to="{ name: 'List', params : {pageId : 1 }}"><Btn msg="Retour à la liste des derniers messages"/></router-link>
  <div class="originalMsg">
    <h3>{{ originMsg.title }}</h3>
    <!--FIXME firstname et lastname s'affichent mais erreur {{ originMsg.User.firstname}} {{originMsg.User.lastname}}-->
    <!-- utilisation d'une méthode {{ fullname(originMsg.User.firstname, originMsg.User.lastname) }}-->
    <p>Auteur :  {{ fullname }} - Date de rédaction: {{ formatedDate(originMsg.creation_date) }}</p>
    <!--TODO format date-->
    <div class="content">
      {{ originMsg.content }}<br>
      <hr>
      <router-link :to="{ name: 'NewMessage', query:{ responseTo : originMsg.id}}" ><Btn msg="Répondre" /></router-link>
      <router-link :to="{ name: 'Modify', params:{msgId : originMsg.id}, query:{ creatorId: originMsg.creator_id ,title : originMsg.title, content : originMsg.content}}"><Btn msg="Modifier" v-if="allowAction"/></router-link>
      <Btn msg="Supprimer" @click="deleteMsg(originMsg.id, originMsg.creator_id)" v-if="allowAction"/>
    </div> 
  <!--TODO affiche les balises html au lieu d'un beau formatage-->
  </div>
  <h4>Réponses</h4>
  <div v-if="responses.length>0" class="responses">
    <div v-for="(response, index) in responses" :key="index" class="response">
      <p>{{ response.content }}</p>
      <hr>
      <p> Auteur : {{ response.creator_id }} - Date de rédaction :{{ formatedDate(response.creation_date) }}</p>
      <Btn msg="Supprimer" @click="deleteMsg(response.id, response.creator_id)"/>
    </div>
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
      fullname:""
    }
  },
  computed:{
    //autorise l'affichage ou non de certains boutons selon l'utilisateur log / createur du message
    //FIXME ne marche que sur originMsg, message principal. Affecter aux reponses en passant un argument mais bug car peut pas mettre origin.qqch dans le template
    allowAction(){
      let allow = (this.originMsg.creator_id == localStorage.getItem('userId')) ? true : false
      return allow
    }
  },
  methods:{
    async deleteMsg(msgId, creatorId){
      await fetch (this.$store.state.src + 'message/',{
        method: "DELETE",
        headers: {
          'authorization': 'bearer ' + localStorage.getItem('token'),
          'content-type': 'application/json'          
        },
        body: JSON.stringify({userId:parseInt(localStorage.getItem('userId')), msgCreatorId: creatorId, messageId: msgId})
      });
      this.$router.push({ name: 'List', params : {pageId : 1 }}); 
    },
    formatedDate(formated_date){
      formated_date = new Date(formated_date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour:'numeric', minute:'numeric' })
      return formated_date
    },
    // fullname(firstname, lastname){
    //   let concat = firstname +' '+ lastname
    //   return concat
    // }
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
    console.log(this.originMsg)
    //FIXME pourquoi ça apparait sous forme de proxy?
    //FIXME pourquoi devoir passer par un fullname?
    this.fullname = this.originMsg.User.firstname +' '+ this.originMsg.User.lastname
    
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
    console.log(this.responses) 
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