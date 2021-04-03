<template>
  <input type="submit" :value=msg>
</template>

<script>
export default {
  name: 'Button',
  props: {
    msg: String
  }
}
</script>

<style lang="scss">

</style>