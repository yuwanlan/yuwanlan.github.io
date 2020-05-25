<template>
  <header>
    <div class="container">
      <h1 @click="handleHome">ONE PRICE</h1>
      <div class="header-right">
        <p>关于</p>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Head',
  data() {
    return {

    }
  },
  methods: {
    handleHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
  .container {
    height: 65px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-size: 22px;
      cursor: pointer;
    }
    .header-right {

    }
  }
}
</style>