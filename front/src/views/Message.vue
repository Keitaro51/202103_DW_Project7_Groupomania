<template>
<p>TEST : Voici le message ayant l'id passée en url, n° {{ $route.params.msgId }}</p>
<router-link to="/home/list"><Btn msg="Retour à la liste des derniers messages"/></router-link>
</template>

<script>
import Btn from "../components/Button.vue";

export default {
  name: "Message",
  components:{
    Btn
  }
};
</script>

<style lang="scss">
</style>