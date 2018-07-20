<template>
  <div id="small-header">
    <header>
      <div class="back" @click="back()">
        <span class='iconfont icon-back'></span>
      </div>
      <p>{{title}}</p>
    </header>
  </div>
</template>

<script>
  export default {
    name: "small-header",
    props:['title'],
    data() {
      return {}
    },
    methods: {
      back: function () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang='less'>
  header {
    width: 100%;
    height: .5rem;
    border-bottom: 1px solid #e9e9e9;
    padding: 0 .15rem;
    display: flex;
    line-height: .5rem;
    background-color: #ffffff;
    .back {
      min-width: .5rem;
      width: .5rem;
      height: 100%;
    }
    p {
      width: 100%;
      text-align: center;
      padding-right: .5rem;
      font-size: .16rem;
    }
  }
</style>
