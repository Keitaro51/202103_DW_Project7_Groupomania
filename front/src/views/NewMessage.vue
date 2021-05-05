<template>
  <h3>Nouveau message</h3>
  <form method="post" @submit="saveMsg" aria-label="Formulaire de création (ou de modification) de nouveau message (ou réponse), selon page de destination">
    <label v-if="(!$route.query.responseTo)" for="title">Titre (max 250 caractères)</label>
    <input v-if="(!$route.query.responseTo)"
      v-model="title"
      class="title"
      type="text"
      id="title"
      name="title"
      required
      maxlength="250"
      aria-label="Titre du message"
    />
    <Editor
      v-model="content"
      class="textcontent"
      initialValue= "tavreg"
      api-key="5wjce11s330g0rfxm66wdq77k5d017gyjy9pqkshr6hb93iq"
      :init="{
        height: 300,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap',
          'searchreplace visualblocks code fullscreen',
          'print preview anchor insertdatetime media',
          'paste code help wordcount table',
        ],
        toolbar:
          'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help',
      }"
      aria-label="Corps du message"
    >
    </Editor>
    
    <Btn msg="Enregistrer" aria-label="Enregistrer le message"/>
    <router-link :to="{ name: 'List', params : {pageId:1 }}" aria-label="Annuler l'action en cours et retour à la page des derniers messages"><Btn msg="Annuler" /></router-link>
  </form>
  
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import Btn from "../components/Button.vue";

export default {
  name: "NewMessage",
  components: {
    Editor,
    Btn
  },
  data(){
    return{
      title:"",
      content:"",
    }
  },
  props: {
    msg: String,
  },
  methods:{
    async saveMsg(e){
      e.preventDefault();
      e.stopPropagation();
        if(!this.$route.params.msgId == true){
          let responseTo
          this.$route.query.responseTo == undefined ? responseTo = null : responseTo = this.$route.query.responseTo
          //fetch new message/response to
          await fetch(this.$store.state.src + 'message/new',{
            method: "POST",
            headers: {
              'authorization': 'bearer ' + localStorage.getItem('token'),
              'content-type': 'application/json'          
            },
            body: JSON.stringify({userId:parseInt(localStorage.getItem('userId')), title: this.title,content: this.content, parent_msg_id:responseTo})
          });
        }else{
          //fetch modify
          await fetch(this.$store.state.src + 'message/modify' ,{
            method: "PATCH",
            headers: {
              'authorization': 'bearer ' + localStorage.getItem('token'),
              'content-type': 'application/json'          
            },
            body: JSON.stringify({userId:parseInt(localStorage.getItem('userId')), messageId: this.$route.params.msgId, msgCreatorId:this.$route.query.creatorId,new_title: this.title,new_content: this.content})
          });
        }
      
      this.$router.push({ name: 'List', params : {pageId : 1 }}); 
    }
  },
  beforeCreate(){
      this.$store.dispatch('isnewmsgpage')
  },
  
  created(){
    if (this.$route.query.title)
      this.title = this.$route.query.title
    if (this.$route.query.content)//FIXME bonne methode de passer tout le title/content en url?
      this.content = this.$route.query.content
  },
  unmounted(){
      this.$store.dispatch('isnewmsgpage')
  }
};
</script>
<style lang="scss">
.title, .TinyMCE {
  width: calc(100% - 10px);
  margin: 10px auto 10px auto;
}
</style>