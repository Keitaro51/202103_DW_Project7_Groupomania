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
    <editor
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
    </editor>
  </form>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";

export default {
  name: "NewMessage",
  components: {
    editor: Editor,
  },
  props: {
    msg: String,
  },
};
</script>
<style lang="scss">
.newtitle {
  width: 75%;
  margin: 10px auto 10px auto;
}
.TinyMCE + * {
  width: 75%;
  margin: auto;
}
</style>