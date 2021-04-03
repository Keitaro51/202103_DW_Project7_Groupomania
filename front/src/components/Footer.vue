<template>
  <footer>{{ msg }}</footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    msg: String
  }
}
</script>

<style lang="scss">
footer{
  position: absolute;
  bottom:0;
  width: 100%;
  background-color:red;
  padding:30px 0 30px 0;
}

</style>