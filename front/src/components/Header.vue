<template>
    <header aria-label="header de la page avec logo et slogan">
      <img src="../assets/icon-left-font-monochrome-white.svg" alt="Logo de groupomania" aria-label="image">
      <h1 aria-label="slogan">Connecting People</h1>
    </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss">

  header{
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