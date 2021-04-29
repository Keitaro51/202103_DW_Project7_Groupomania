<template>
  <h3>Liste des 10 derniers messages</h3>
  <table>
    <tr> 
      <th>
        Titre du message d'origine
      </th>
      <th>
        Aperçu du dernier message
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
      <td class="content">
        {{ msg.content }}<!--FIXME remove html tags(msg.content) -->
      </td>
      <td class="creator"> 
        <!--FIXME si message puis reponses = 2 lignes new. pas faux mais pas opti-->
        {{ msg.User.firstname +' '+ msg.User.lastname}}
      </td>
      <td class="lastdate">
        {{ formatedDate(msg.creation_date) }}
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
  // watch: { 
  //   $route(to, from) {
  //     if(to !== from){location.reload();}
  //   }
  // },
  //TODO reload pas opti, <router-view :key="$route.path" /> ??
  async beforeCreate(){
    //FIXME si un message et une reponse créée, réponse apparait avec et pas à la place du message
    //FIXME mes propres messages apparaissent en new :)
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
    //FIXMErendre cette fonction globale
    formatedDate(formated_date){
      formated_date = new Date(formated_date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour:'numeric', minute:'numeric' })
      return formated_date
    },
    checkNew(date){
      let msgDate= new Date(date).getTime()
      let lastTimeConnected = new Date(localStorage.getItem('lastTimeConnected')).getTime()
      if (msgDate - lastTimeConnected > 0){ 
        //TODO changer pour prendre en compte last connection
        return true
      }
    }
    // removeTag(formated_content){
    //   console.log(formated_content)
    //   //FIXME remove tag - regex ou npm html-to-text?
    // }
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