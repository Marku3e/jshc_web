<template>
  <div id="com_header">
    <div id="city">
      <i>武汉</i>
      <span class='iconfont icon-down2'></span>
    </div>
    <div id="search"></div>
    <div id="user"><span class="iconfont icon-gerenzhongxin"></span>
      <!--<span class='iconfont icon-gerenzhongxin'></span>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "com_header",
    data() {
      return {}
    }
  }
</script>

<style scoped lang='less'>
  #com_header {
    padding: .125rem .15rem;
    padding-top: .125rem;
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    z-index: 144;
    /*height: .502rem;*/
    position: absolute;
    left: 0;
    top: 0;
    #city {
      i{
        font-size: .17rem;
        line-height: .27rem;
      }
      color: #ffffff;
      min-width: .57rem;
      height: .27rem;
      .iconfont {
        font-size: .14rem;
        margin-left: -.04rem;
      }
    }
    #search {
      height: .27rem;
      width: 100%;
      background-color: #f5f5f5;
      border-radius: .06rem;

    }
    #user {
      min-width: .3rem;
      color: #ffffff;
      line-height: .27rem;

      .iconfont {
        font-size: .16rem;
        margin-left: .12rem;
        font-weight: 700;
      }
    }
  }
</style>
