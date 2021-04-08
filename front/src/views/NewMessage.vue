<template>
  <h3>Nouveau message</h3><!--TODO {{ msg }}: Afficher Nouveau message ou Nouvelle réponse selon provenance-->
  <form method="post">
    <label for="title">Titre (max 250 caractères)</label>
    <input
      class="newtitle"
      type="text"
      id="title"
      name="title"
      required
      maxlength="250"
    />
    <Editor
      class="TinyMCE"
      initialValue="<p>Initial editor content</p>"
      :init="{
        height: 500,
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
    <router-link to="/home/message/:msg"><Btn msg="Enregistrer"/></router-link>
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
  props: {
    msg: String,
  },
};
</script>
<style lang="scss">
.newtitle, .TinyMCE, .newtitle {
  width: calc(100% - 10px);
  margin: 10px auto 10px auto;
}
</style>