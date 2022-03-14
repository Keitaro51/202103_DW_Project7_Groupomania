<template>
  <footer>
    <ul>
      <li><a href="mailto:contact@groupomania.com" aria-label="email de contact">Contact</a></li>
      <li aria-label="mentions légales du site">Mentions légales</li>
      <li><router-link :to="{ name: 'Sitemap'}" aria-label="lien vers le plan du site" >Plan du site</router-link></li>
    </ul>
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
  color:white;
}
ul{
  padding:0
}
li{
  list-style: none;
  padding-top: 5px;
}
</style>