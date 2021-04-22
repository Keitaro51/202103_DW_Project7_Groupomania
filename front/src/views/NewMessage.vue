<template>
  <h3>Nouveau message</h3>
  <form method="post" @submit="saveMsg">
    <label v-if="!$route.query.responseTo" for="title">Titre (max 250 caractères)</label>
    <input v-if="!$route.query.responseTo"
      v-model="title"
      class="title"
      type="text"
      id="title"
      name="title"
      required
      maxlength="250"
    />
    <!--FIXME titre en query si modify => value="?"-->
    <!--FIXME content en query si modify-->
    <Editor
      v-model="content"
      class="textcontent"
      initialValue=""
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
    >
    </Editor>
    <!--FIXME router link Enregistrer ne marche pas. Fetch ok, maiis url reste, + ?title=...-->
    <!-- <Btn msg="Enregistrer" @click ="saveMsg"/> -->
    <Btn msg="Enregistrer" />
    <router-link :to="{ name: 'List', params : {pageId:1 }}"><Btn msg="Annuler" /></router-link>
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
      content:""  //TODO enregistre avec balises de formatage, good et pas good en même temps
    }
  },
  props: {
    msg: String,
  },
  watcher:{
    //FIXME pas savoir, modifier certains éléments de design selon si new message, response ou modify qui pointent tous vers le même compsant
  },
  methods:{
    //enregistre un nouveau message/réponse en fonction du format de l'url
    async saveMsg(e){
      e.preventDefault();
      e.stopPropagation();
      await fetch(this.$store.state.src + 'message/new',{
        method: "POST",
        headers: {
          'authorization': 'bearer ' + localStorage.getItem('token'),
          'content-type': 'application/json'          
        },
        body: JSON.stringify({userId:parseInt(localStorage.getItem('userId')), title: this.title,content: this.content, parent_msg_id:this.$route.query.responseTo})
      });
      this.$router.push({ name: 'List', params : {pageId : 1 }}); 
      // FIXME redirige vers http://localhost:8080/?title=Test#/home/list/1. 
      // URL Ok si @submit dans form mais message d'erreur
    }
  },
  beforeCreate(){
    
      this.$store.dispatch('isnewmsgpage')
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