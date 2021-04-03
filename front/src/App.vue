<template>
  <Navbar/>
  <Connect/>
  <Footer msg="Ceci est un footer"/>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Connect from './components/Connect.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    Connect
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
  margin-top: 60px;
}
body{
  margin:0;
}
</style>
