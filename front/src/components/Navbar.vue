<template>
    <nav>
      <img src="../assets/icon-left-font-monochrome-white.svg" alt="Logo de groupomania">
      <h1>Connecting People</h1>
    </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="scss">

  nav{
    height:110px;
    padding:30px 0 20px 0;
    background-image: linear-gradient(
        rgba(16, 34, 65, 0.7), 
        rgba(16, 34, 65, 0.7)
      ) , url('../assets/background.png');
     background-size: cover;
     background-position: center;
    img{
      max-width:300px;
      object-fit: cover;
    }
    h1{
      color: white;
      font-size: 20px;
    }
  }
</style>