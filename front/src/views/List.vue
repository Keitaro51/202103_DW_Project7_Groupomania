<template>
  <h3>Liste des 10 derniers messages</h3>
  <table>
    <tr> 
      <th></th>
      <th>
        Titre du message d'origine
      </th>
      <th>
        Aperçu du message d'origine
      </th>
      <th>
        Createur du message d'origine
      </th>
      <th>
        Dernière modification
      </th>
    </tr>
    <tr class="msg1">
      <td class="new">
        New
      </td>
      <td class="title">
        Msg 1 title
      </td>
      <td class="content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, praesentium? Quidem sunt iure, eligendi cumque excepturi est dolorem dolore architecto dolores possimus aspernatur nulla rem alias fugiat, optio odio amet!
      </td>
      <td class="creator">
        Creator
      </td>
      <td class="lastdate">
        Date last change
      </td>
      <router-link to="/home/message/:msgId"><Btn class="Btn" msg="Voir"/></router-link>
    </tr>
  </table>
</template>

<script>
import Btn from "../components/Button.vue";

export default {
  name: "List",
  components:{
    Btn
  }
};
</script>

<style lang="scss">
table{
  border-collapse : collapse;
  tr :not(a){ //après mount, <router-link> devient <a>
    border:solid 1px black;
    padding:5px;
  }
  .Btn{
    margin:25% 10px 25% 10px;
  }
  width:75%;
  margin:auto
}
</style>