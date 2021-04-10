<template>
  <Navbar/>
  <main>
    <router-view/> 
  </main>
  <Footer/>
</template>



<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}
main{
  min-height: calc(100vh - 160px - 78px);
}
body{
  margin:0;
}
</style>
