<template>
  <div id="login">
    <div class="back">
      <span class='iconfont icon-delete'></span>
    </div>
    <div class="logo"></div>
    <div class="sign-in">
      <div class="phoneNo">
        <input type="number" placeholder='请输入手机号码'>
      </div>
      <div class="code df">
        <input type="number" placeholder='请输入验证码'>
        <button>获取验证码</button>
      </div>
      <div class="agreement"></div>
      <button>登录</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {}
    }
  }
</script>

<style scoped lang='less'>
  #login {
    padding: 0 .15rem;
    padding-top: .2rem;

    .back {
      height: .15rem;
      margin-bottom: .34rem;
    }
    .logo {
      width: .85rem;
      height: .85rem;
      margin: 0 auto;
      background: url("../../assets/images/home/1/logo.png") no-repeat;
      -webkit-background-size: .85rem;
      background-size: .85rem;
    }
    .sign-in {
      margin-top: .51rem;
      .phoneNo, .code {
        width: 100%;
        height: .6rem;
        border-bottom: 1px solid #ddd;
        input {
          outline: none;
          border: none;
          width: 100%;
          height: 100%;
          padding-left: .1rem;
          padding-top: .3rem;
        }
        button {
          min-width: .87rem;
          height: .325rem;
          margin-top: .125rem;
          border: 1px solid #e9e9e9;
          background-color: #f5f5f5;
          text-align: center;
          font-size: .13rem;
          color: #878787;
          outline: none;
        }
      }
    }
  }
</style>
