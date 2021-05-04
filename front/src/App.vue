<template>
  <Header/>
  <main>
    <router-view/> 
  </main>
  <Footer/>
</template>



<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
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
