<template>
  <nav>
    <img src="../assets/icon.png" alt="Logo de groupomania">
    <h1>Groupomania</h1>
    <ul>
      <li>Lien1</li>
      <li>Lien2</li>
    </ul>    
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>

<style lang="scss">
  nav{
    display:flex;
    margin-bottom:40px;
    img{
      max-height:50px;
    }
    ul{
      list-style:none;
      display:flex;
      justify-content:space-between;
      li{
        margin-right:10px
      }
    }
  }
</style>