<template>
  <div class="blog-detail">

  </div>
</template>

<script>
export default {
  name: 'blog-detail',
  mounted() {
    axios.get('../../markdown/demo.md').then(res => {
      console.log(res, '==res')
    })
  }
}
</script>

<style lang="scss" scoped>
.blog-detail {

}
</style>