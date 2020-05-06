<template>
  <div>
    <Header />
    <nuxt />
  </div>
</template>

<script>
import Header from '../components/header'
export default {
  name: 'default',
  components: {
    Header
  },
  data() {
    return {

    }
  }
}
</script>

<style>
html {
 
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
