<template>
  <input class="btn" type="submit" :value=msg>
</template>

<script>
export default {
  name: 'Btn',
  props: {
    msg: {
      type:String,
      required:true
    }
  }
}
</script>

<style lang="scss">
.btn{
  font-weight:bold;
  padding:5px;
  border-radius : 5px;
  background:rgba(16, 34, 65, 0.7);
  color:white;
}
</style>