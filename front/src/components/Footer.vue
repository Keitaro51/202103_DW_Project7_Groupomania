<template>
  <footer>
    <ui>
      <li>Contact</li>
      <li>Mentions légales</li>
      <li>Plan du site</li>
    </ui>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss">
footer{
  width: 100%;
  background-color:rgba(16, 34, 65, 0.7);
  padding:30px 0 30px 0;
  color:white; /*TODO améliorer le footer*/
}
li{
  list-style: none;
  padding-top: 5px;
}
</style>