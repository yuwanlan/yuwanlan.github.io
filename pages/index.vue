<template>
  <div class="container">
    <!-- <button @click="getMd">获取</button> -->
    <!-- <button @click="getList">获取列表数据</button> -->
    <p v-for="(item, index) in list" :key="index" @click="handleDetail(item)">{{ item.title }}</p>
  </div>
</template>

<script>
export default {
  name: 'index',
  async asyncData(context) {
    let { $axios } = context;
    let list;
    await $axios.get('/get-md/list').then(res => {
      list = res.data.module.list
    })
    return {
      list
    }
  },
  data() {
    return {
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
    },
    handleDetail(item) {
      this.$router.push(`./blogs/${item.id}`)
    }
  },
  mounted() {
    this.getList();
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
}
</style>
