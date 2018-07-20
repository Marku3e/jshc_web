<template>
  <div id="login">
    <div class="back" @click='back()'>
      <span class='iconfont icon-delete'></span>
    </div>
    <div class="logo"></div>
    <div class="sign-in">
      <div class="phoneNo">
        <input type="number" placeholder='请输入手机号码' v-model='phone' :readonly="isDisable">
      </div>
      <div class="code df">
        <input type="number" placeholder='请输入验证码' v-model='psw'>
        <button @click="getVerificationCode()" :disabled='isDisable'>{{code}}</button>
      </div>
      <div class="agreement">
        <input type="checkbox" id="myCheck" v-model='checkVal' @change=check()>
        <label for="myCheck" class='iconLabel'><span class='iconfont icon-duigou'></span></label>
        <label for="myCheck">同意并已阅读</label>
        <router-link :to="'/agreement'" class='user-agreement'>《用户协议》</router-link>
      </div>
      <mt-button type="default" @click='signIn()'>登录</mt-button>

    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';

  export default {
    name: "login",
    data() {
      return {
        phone: '',
        psw: '',
        isDisable: false,
        code: '获取验证码',
        checkVal: true,
        popupVisible: true
      }
    },
    methods: {
      back: function () {
        this.$router.go(-1)
      },
      check: function () {
        console.log(this.checkVal);
      },
      signIn: function () {
        console.log(this.phone);
        console.log(this.psw);

        let that = this
        let url = this.$com.baseUrl + '/common/checkSmsCode'
        let loginUrl = this.$com.baseUrl + '/userClient/v1/login'
        this.$com.api(url, {'phone': this.phone, 'code': this.psw}, (res) => {
          // console.log(res);
          if (res.res_code == '200') {
            that.$com.api(loginUrl, {'phone': this.phone}, (result) => {
              console.log(result);
              if (result.res_code == '0000') {
                localStorage.setItem('jshc_accessToken', 'agreeLogin')
                localStorage.setItem("jshc_userName", this.phone);
                localStorage.setItem("jshc_id", result.data.id);
                localStorage.setItem("jshc_token", result.data.token);
                that.$router.push({path: '/'})
              } else {
                Toast({
                  message: '登陆失败',
                  position: 'center',
                  duration: 1400
                });
              }
            })
          } else {
            Toast({
              message: '登陆失败',
              position: 'center',
              duration: 1400
            });
          }
        })
      },
      getVerificationCode: function () {
        if (this.phone.length == 11) {
          this.$com.api(this.$com.baseUrl + '/common/smscode', {'phone': this.phone}, (res) => {
            if (res.res_code == '200') {
              Toast({
                message: '发送成功',
                position: 'center',
                duration: 1400
              });
            } else {
              Toast({
                message: res.res_msg,
                position: 'center',
                duration: 1400
              });
            }
          })
          this.isDisable = true
          this.code = 60 + 's'
          let getCodeTimer = setInterval(() => {
            if (parseInt(this.code) == '1') {
              this.code = '获取验证码'
              this.isDisable = false
              clearInterval(getCodeTimer)
            } else {
              this.code = (parseInt(this.code) - 1) + 's';
            }
          }, 1000)

        } else {
          Toast({
            message: '请输入正确的手机号',
            position: 'center',
            duration: 1400
          });
        }
      }
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
          /*padding-top: .3rem;*/
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
          border-radius: 4px;
        }
      }
    }
    .agreement {
      margin: .25rem 0;
      input {
        display: none;
      }
      .iconLabel {
        background-color: #ffffff;
        border-radius: 50%;
        border: 1px solid #e40011;
        width: 0.14rem;
        height: 0.14rem;
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        line-height: 0.14rem;
        color: #ffffff;
        span {
          font-size: .12rem;
          vertical-align: text-top;
        }
      }
      label {
        color: #999;

      }
      #myCheck:checked + label {
        background-color: #e40011;
      }
      .user-agreement {
        color: #e40011;
      }
    }
    .mint-button--default {
      width: 3.45rem;
      background-color: #e40011;
      color: #fff;
      border-radius: 50px 50px;
      height: .5rem;
    }
  }
</style>
