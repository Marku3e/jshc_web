<template>
  <div id="collect">
    <header>
      <div class="back" @click="back()">
        <span class='iconfont icon-back'></span>
      </div>
      <p>我的收藏</p>
      <div class="edit" @click="edits=!edits">
        编辑
      </div>
    </header>
    <car-list :edits='edits' :is-collect="isCollect"></car-list>
  </div>
</template>

<script>
  import carList from '../../common/comCarList'

  export default {
    name: "collect",
    components: {
      'carList': carList
    },
    data() {
      return {
        edits: false,
        isCollect: true,
      }
    },
    methods: {
      back: function () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang='less'>
  #collect {
    header {
      width: 100%;
      height: .5rem;
      border-bottom: 1px solid #e9e9e9;
      padding: 0 .15rem;
      display: flex;
      line-height: .5rem;
      .back, .edit {
        min-width: .5rem;
        width: .5rem;
        height: 100%;
      }
      p {
        width: 100%;
        text-align: center;
        font-size: .16rem;
      }
      .edit {
        text-align: right;
      }
    }
  }

</style>
