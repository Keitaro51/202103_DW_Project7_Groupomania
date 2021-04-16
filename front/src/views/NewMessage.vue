<template>
  <h3>Nouveau message</h3>
  <form >
    <label for="title">Titre (max 250 caractères)</label>
    <input
      v-model="title"
      class="title"
      type="text"
      id="title"
      name="title"
      required
      maxlength="250"
    />
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
    <!--router link Enregistrer ne marche pas. Fetch ok, maiis url reste, + ?title=...-->
    <Btn msg="Enregistrer" @click="saveMsg"/>
    <router-link :to="{ name: 'List', params : {pageId : 1 }}"><Btn msg="Annuler" /></router-link>
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
  methods:{
    async saveMsg(){
      await fetch(this.$store.state.src + 'message/new',{
        method: "POST",
        headers: {
          'authorization': 'bearer ' + localStorage.getItem('token'),
          'content-type': 'application/json'          
        },
        body: JSON.stringify({userId:parseInt(localStorage.getItem('userId')), title: this.title,content: this.content})
      });
      this.$router.push({ name: 'List', params : {pageId : 1 }});
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