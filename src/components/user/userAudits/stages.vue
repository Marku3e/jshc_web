<template>
  <div id="stages">
    <header>
      <div class="back" @click="back()">
        <span class='iconfont icon-back'></span>
      </div>
      <p>分期详情</p>
    </header>
    <div class="stagesList">
      <div class="s-header">
        <div>期数</div>
        <div>时间</div>
        <div>金额</div>
        <div>状态</div>
      </div>
      <div class="s-body">
        <ul>
          <li v-for="(item ,index) in 12">
            <p>第一期</p>
            <p>2018.04.02</p>
            <p>1258</p>
            <p class="state">已付</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "stages",

    data() {
      return {}
    },
    methods: {
      back: function () {
        let data = {
          show: false
        };
        this.$emit('closePopup', data, 'closePopup');
      }
    }
  }
</script>

<style scoped lang='less'>
  #stages {
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
    .stagesList {
      .s-header {
        padding: 0 .15rem;
        display: flex;
        height: .4rem;
        line-height: .4rem;
        div {
          width: 25%;
          text-align: center;
          font-size: .12rem;
          color: #666666;

        }
      }
      .s-body {
        background-color: #ffffff;
        padding: 0 .15rem;
        ul > li {
          display: flex;
          border-bottom: 1px solid #dddddd;
          height: .55rem;
          line-height: .55rem;
          p {
            width: 25%;
            text-align: center;
            font-size: .14rem;
            color: #333333;

          }
        }

      }
    }
  }

</style>
