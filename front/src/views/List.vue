<template>
  <h3>Liste des 10 derniers messages</h3>
  <table>
    <tr> 
      <th>
        Titre du message d'origine
      </th>
      <th>
        Aperçu du dernier post
      </th>
      <th>
        Createur du message d'origine
      </th>
      <th>
        Dernière modification
      </th>
    </tr>
    <tr v-for="msg of msgList" :key="msg.id" :class="`${msg.id}`">
      <td class="title">
        {{ msg.title }}
        <p v-if="checkNew(msg.creation_date) == true" class="new">NEW</p>
      </td>
      <td class="content" v-html="msg.content.substr(0, 120)"/>
      <td class="creator">
        {{ msg.User.firstname +' '+ msg.User.lastname}} <!--FIXME la profondeur msg.User ne gêne pas comme dans l'autre component-->
      </td>
      <td class="lastdate">
        {{ displayedDate(msg.creation_date) }}
      </td>
      
      <router-link :to="{ name: 'Message', params: { msgId : msg.id }, query:{parentMsg : msg.parent_msg_id}} "><Btn class="Btn" msg="Voir"/></router-link>
    </tr>
  </table>
  <div class="page_counter">
    <router-link :to="{ name: 'List', params : {pageId : 1 }}">First </router-link>
    <router-link v-show="$route.params.pageId > 1" :to="{ name: 'List', params : {pageId : $route.params.pageId - 1 }}">Previous </router-link>
    <router-link v-for="page in Math.ceil(count/10)" :key="page" :to="{ name: 'List', params : {pageId : page }}">{{ page }}</router-link>
    <router-link v-show="$route.params.pageId < Math.ceil(count/10)" :to="{ name: 'List', params : {pageId : parseInt($route.params.pageId) + 1 }}"> Next</router-link>
    <router-link :to="{ name: 'List', params : {pageId : Math.ceil(count/10)}}">Last </router-link>
  </div>
</template>

<script>
import Btn from "../components/Button.vue";
import formatDate from "../tools";

export default {
  name: "List",
  components:{
    Btn
  },
  data(){
    return{
      msgList:[],
      count:0
    }
  },
  async beforeCreate(){
      let lasts = await fetch(this.$store.state.src + 'message/lasts',{
        method: "POST",
        headers: {
          'authorization': 'bearer ' + localStorage.getItem('token'),
          'content-type': 'application/json'          
        },
        body: JSON.stringify({userId:parseInt(localStorage.getItem('userId')), pageNbr: this.$route.params.pageId})
      });
      this.msgList = await lasts.json();
      this.count = this.msgList.count;
      this.msgList = this.msgList.list;
  },
  methods:{
    displayedDate(dateToFormat){
      return formatDate(dateToFormat)//FIXME onligé de créer une methode pour appeler la methode importée? relou?
    },
    checkNew(date){
      let msgDate= new Date(date).getTime()
      let lastTimeConnected = new Date(localStorage.getItem('lastTimeConnected')).getTime()
      if (msgDate - lastTimeConnected > 0){ 
        return true
      }
    }
  }
};
</script>

<style lang="scss">
table{
  border-collapse : collapse;
  width:75%;
  margin:auto;
  tr :not(a){
    border:solid 1px black;
  }
  .content *{
    border:none
  }
  .Btn{
    margin:25% 10px 25% 10px;
  }
  td{
    position:relative;
    .new{
      position: absolute;
      top:10px;
      left:10px;
      color:red;
      margin:0;
      padding:5px;
    }
  }
}
a{
  font-weight: bolder;
  text-decoration: none;
}
.page_counter{
  width:40%;
  margin:20px auto 20px auto;
  display:flex;
  justify-content: space-between;
}

</style>