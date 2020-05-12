<template>
  <div class="container">
    <button @click="getMd">获取</button>
    <button @click="getList">获取列表数据</button>
    <div v-html="markdown"></div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      list: [],
      markdown: ''
    }
  },
  methods: {
    getMd() {
      let id = this.list[0];
      this.$axios.get(`/get-md/${id}`).then(res => {
        console.log(res, '==res')
        this.markdown = res.data;
      })
    },
    getList() {
      this.$axios.get('/get-md/list').then(res => {
        this.list = res.data.module.list
      })
    }
  },
  mounted() {
    // this.getMd();
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
