<template>
  <!--<div id="comHeader" :class={abs:back,change:isflex}>-->
  <div id="comHeader" :class={abs:!back}>
    <div id="back" v-if='back' @click='backhistroy()'>
      <span class='iconfont icon-back'></span>
    </div>
    <!--<div id="city" :class={black:back||isflex}>-->
    <div id="city" :class={black:back} @click='openCity()' ref="cityBox">
      <i>{{cityName}}</i>
      <span class='iconfont icon-down2'></span>
    </div>
    <div v-transfer-dom>
      <popup v-model="show" height="100%" class='popupBox'>
        <city @closePopup='closePopup' :sendApi=show v-on:getCityName='getCityName'></city>
      </popup>
    </div>
    <router-link :to="'/search'" id="search"></router-link>
    <!--<div id="user" :class={black:back||isflex}>-->
    <router-link :to="'/user'" id="user" :class={black:back}>
      <span class="iconfont icon-gerenzhongxin"></span>
      <!--<span class='iconfont icon-gerenzhongxin'></span>-->
    </router-link>
  </div>
</template>

<script>
  import city from './comCity'
  import {TransferDom, XButton, Popup} from 'vux'
  import Bus from './bus'
  import {mapState} from 'vuex'

  export default {
    name: "comHeader",
    props: ['back'],
    directives: {
      TransferDom
    },
    components: {
      XButton,
      Popup,
      city
    },
    data() {
      return {
        isBack: false,
        isflex: false,
        show: false,
      }
    },
    watch: {
      'cityName': function (val) {
        // console.log(val.length);
        let length = val.length - 1
        let boxWidth = length * 17 + 40
        // console.log(boxWidth);
        let el = this.$refs.cityBox
        el.style.minWidth = boxWidth / 100 + 'rem'
        // console.log(val.length);
      }
    },
    computed: {
      ...mapState(['cityName'])
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll: function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        // console.log(scrollTop)
        // if (scrollTop > 150) {
        //   this.isflex = true
        // } else {
        //   this.isflex = false
        // }
      },
      backhistroy: function () {
        this.$router.push({path: '/'})
      },
      openCity: function () {
        this.show = true
        this.$emit('openPopup', this.show)
      },
      closePopup: function (event, data) {
        this.show = event.show
        this.$emit('openPopup', this.show)
      },
      getCityName: function (data, id) {
        // this.cityName = data
        Bus.$emit('sendCityName', data, id)
      }
    }
  }
</script>

<style scoped lang='less'>
  #comHeader.abs {

    position: absolute;
    left: 0;
    top: 0;
    /*background-color: #fff;*/

  }

  /*#comHeader.change {*/
  /*background-color: #fff;*/
  /*}*/

  #comHeader {
    padding: 0 .15rem;
    padding-top: .125rem;
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    z-index: 144;
    /*position: fixed;*/
    /*left: 0;*/
    /*top: 0;*/
    /*height: .502rem;*/

    #back {
      line-height: .27rem;
      margin-right: .14rem;
      .iconfont {
        font-size: .16rem;
      }
    }
    #city {
      i {
        font-size: .17rem;
        line-height: .27rem;
        /*overflow: hidden;*/
        /*text-overflow: ellipsis;*/
        /*white-space: nowrap;*/

      }
      color: #ffffff;
      min-width: .57rem;
      height: .27rem;
      display: flex;
      .iconfont {
        font-size: .14rem;
        /*margin-left: -.04rem;*/
        margin-right: .06rem;
        line-height: .27rem;
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
        font-size: .18rem;
        margin-left: .12rem;
        font-weight: 700;
      }
    }
    #city.black, #user.black {
      color: #000;
    }
  }
</style>
