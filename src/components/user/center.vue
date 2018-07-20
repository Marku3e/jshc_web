<template>
  <div id="center">
    <header>
      <div class="back" @click="back()">
        <span class='iconfont icon-back'></span>
      </div>
      <p>个人中心</p>
      <div class="signOut" @click='show = true'>登出</div>
    </header>
    <div class="userInfo">
      <div class="photo">
        <img src="../../assets/images/other/photo.png" alt="">
      </div>
      <div class="phone">{{userName}}</div>
    </div>
    <div class="bb"></div>
    <div class="option">
      <router-link :to="'/user/order'" class="userOrder">
        <div class="icon"></div>
        <div class="text">我的订单 <span class='iconfont icon-go'></span></div>
      </router-link>
      <router-link :to="'/user/audits'" class="userAudits">
        <div class="icon"></div>
        <div class="text">金融申请 <span class='iconfont icon-go'></span></div>
      </router-link>
      <router-link :to="'/user/collect'" class="userCollect">
        <div class="icon"></div>
        <div class="text">我的收藏 <span class='iconfont icon-go'></span></div>
      </router-link>
      <router-link :to="'/user/order'" class="callUs">
        <div class="icon"></div>
        <div class="text">联系我们 <span class='iconfont icon-go'></span></div>
      </router-link>
      <router-link :to="'/user/order'" class="aboutUs">
        <div class="icon"></div>
        <div class="text">关于我们 <span class='iconfont icon-go'></span></div>
      </router-link>
    </div>
    <div v-transfer-dom>
      <confirm v-model="show"
               title="退出登录"
               @on-confirm="signOut()">
        <p style="text-align:center;">确定吗?</p>
      </confirm>
    </div>
  </div>
</template>

<script>
  import {TransferDomDirective as TransferDom, Confirm} from 'vux'

  export default {
    name: "center",
    directives: {
      TransferDom
    },
    components: {
      Confirm
    },
    data() {
      return {
        userName: localStorage.getItem('jshc_userName'),
        show: false,
      }
    },
    methods: {
      back: function () {
        this.$router.go(-1)
      },
      signOut: function () {
        localStorage.removeItem('jshc_userName')
        localStorage.removeItem('jshc_accessToken')
        this.$router.push({path: '/login'})
      }
    }
  }
</script>

<style scoped lang='less'>
  #center {
    position: relative;
    background-color: #f5f5f5;
    height: 100vh;
    header {
      padding: 0 .15rem;
      width: 100%;
      height: .5rem;
      line-height: .5rem;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      color: #ffffff;
      text-align: center;
      .back, .signOut {
        width: .5rem;
        height: 100%;
        text-align: left;
      }
      .signOut {
        text-align: right;
      }
    }
    .userInfo {
      width: 100%;
      height: 2.33rem;
      background: url("../../assets/images/other/userBg.png") no-repeat;
      -webkit-background-size: 100% 2.33rem;
      background-size: 100% 2.33rem;
      padding-top: .815rem;
      text-align: center;
      color: #ffffff;
      .photo {
        width: .7rem;
        height: .7rem;
        border-radius: 50%;
        margin: 0 auto;
        margin-bottom: .05rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .option {
      padding: 0 .15rem;
      background-color: #ffffff;
      > a {
        height: .5rem;
        display: flex;
        &:nth-of-type(2) {
          .icon {
            background-image: url("../../assets/images/other/audits.png");
          }
        }
        &:nth-of-type(3) {
          .icon {
            background-image: url("../../assets/images/other/collect.png");
          }
        }
        &:nth-of-type(4) {
          .icon {

            background-image: url("../../assets/images/other/callUs.png");
          }
        }
        &:nth-of-type(5) {
          .icon {
            background-image: url("../../assets/images/other/aboutUs.png");
          }
          .text {
            border: none;
          }
        }
        .icon {
          min-width: .17rem;
          height: .17rem;
          background-image: url("../../assets/images/other/order.png");
          background-repeat: no-repeat;
          -webkit-background-size: .17rem;
          background-size: .17rem;
          margin-top: .165rem;

        }
        .text {
          width: 100%;
          height: 100%;
          line-height: .5rem;
          margin-left: .175rem;
          border-bottom: 1px solid #e9e9e9;
          font-size: .16rem;
          color: #333333;
          display: flex;
          justify-content: space-between;
          span {
            font-size: .12rem;
            color: #bbb;
          }
        }
      }
    }
  }

</style>
