<template>
  <div id="helpMe">
    <sHeader :title="title"></sHeader>
    <div class="bb"></div>
    <div class="container">
      <div class="title">
        <p>提交购车需求,<i>好提车 提好车</i></p>
      </div>
      <div class="form">
        <div class="ipt">
          <div class="f-title">所在城市</div>
          <div class="f-result" @click="openCity()">
            <p>{{cityName}}</p>
          </div>
          <span class="iconfont icon-go"></span>
        </div>
        <div v-transfer-dom>
          <popup v-model="show" height="100%" class='popupBox'>
            <city @closePopup='closePopup' :sendApi=show v-on:getCityName='getCityName'></city>
          </popup>
        </div>
        <div class="ipt">
          <div class="f-title">姓名</div>
          <div class="f-result">
            <input type="text" placeholder="请输入您的姓名" v-model="userName" :readonly="isDisable">
          </div>
        </div>
        <div class="ipt">
          <div class="f-title">手机号</div>
          <div class="f-result">
            <input type="number" placeholder='请输入手机号码' v-model='phone' :readonly="isDisable" @input="changeNo">
          </div>
        </div>
        <div class="ipt">
          <input type="number" placeholder='请输入验证码' v-model='psw'>
          <button @click="getVerificationCode()" :disabled='isDisable'>{{code}}</button>
        </div>
        <mt-button type="default" class='btn' @click="helpMe()" :disabled="isSend">帮我选车</mt-button>
      </div>
    </div>
    <div class="bb"></div>
    <div class="recommend">
      <h4>好车推荐</h4>
      <car-list></car-list>
    </div>
    <mt-popup v-model="success" class="success">
      <h4>预约成功</h4>
      <p>我们会安排客服24小时内联系您</p>
      <mt-button type="default" class='btn' @click="ok()">我知道了</mt-button>
    </mt-popup>
  </div>
</template>

<script>
  import sHeader from '../common/smallHeader'
  import carList from '../common/comCarList'
  import {Group, DatetimeRange, Spinner, TransferDom, XButton, Popup} from 'vux'
  import city from '../common/comCity'
  import Bus from '../common/bus'
  import {Toast} from 'mint-ui'

  export default {
    name: "helpMe",
    directives: {
      TransferDom
    },
    components: {
      sHeader,
      carList,
      XButton,
      Popup,
      city
    },
    data() {
      return {
        title: "帮我选车",
        success: false,
        show: false,
        cityName: '',
        cityId: '',
        userName: '',
        phone: '',
        psw: '',
        code: '获取验证码',
        isDisable: false,
        isSend: true
      }
    },
    methods: {
      helpMe: function () {
        let that = this
        let data = {
          cityId: this.cityId,
          name: this.userName,
          phone: this.phone
        }
        let codeUrl = this.$com.baseUrl + '/common/checkSmsCode'
        let url = this.$com.baseUrl + '/wx/car/saveHelpSelectCar'
        this.$com.api(codeUrl, {'phone': this.phone, 'code': this.psw}, (res) => {
          console.log(res);
          if (res.res_code == '200') {
            that.$com.api(url, data, (result) => {
              console.log(result);
              if (result.res_code == '0000') {
                this.success = true
              } else {
                Toast({
                  message: res.res_msg,
                  position: 'center',
                  duration: 1400
                });
              }
            })
          }
        })

      },
      ok: function () {
        this.success = false

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
        this.cityName = data
        this.cityId = id
        Bus.$emit('sendCityName', data, id)
      },
      getVerificationCode: function () {
        let that = this
        if (this.cityName == "") {
          Toast({
            message: '请选择城市',
            position: 'center',
            duration: 1400
          });
          return;
        }
        if (this.userName == "") {
          Toast({
            message: '请输入姓名',
            position: 'center',
            duration: 1400
          });
          return;
        }
        if (this.phone.length != 11) {
          Toast({
            message: '请输入正确的手机号',
            position: 'center',
            duration: 1400
          });
          return;
        }
        this.$com.api(this.$com.baseUrl + '/common/smscode', {'phone': this.phone}, (res) => {
          if (res.res_code == '200') {
            Toast({
              message: '发送成功',
              position: 'center',
              duration: 1400
            });
            that.isSend = false
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

      },
      changeNo: function () {
        this.isSend = true
      }
    },

  }
</script>

<style scoped lang='less'>
  #helpMe {
    .container {
      padding: 0 .15rem;
      .title {
        height: .89rem;
        border-bottom: 1px solid #dddddd;
        p {
          font-size: .19rem;
          line-height: .89rem;
          text-align: center;
          i {
            font-size: .19rem;
            color: #e40011;
          }
        }
      }
      .form {
        .ipt {
          height: .5rem;
          border-bottom: 1px solid #dddddd;
          display: flex;
          .f-title {
            line-height: .5rem;
            font-size: .14rem;
            min-width: 1rem;
          }
          .f-result {
            line-height: .5rem;
            width: 100%;
            color: #000000;

          }
          input {
            width: 100%;
            border: none;
            outline: none;
            &::placeholder {
              color: #cccccc;
            }
          }
          button {
            min-width: .87rem;
            height: .325rem;
            margin-top: .09rem;
            border: 1px solid #e9e9e9;
            background-color: #f5f5f5;
            text-align: center;
            font-size: .13rem;
            color: #878787;
            outline: none;
            border-radius: 4px;
          }
          span {
            font-size: .1rem;
            color: #cccccc;
            line-height: .5rem;
          }
        }
        .btn {
          width: 100%;
          height: .5rem;
          background-color: #e40011;
          color: #fff;
          border-radius: .5rem;
          font-size: .16rem;
          margin: .3rem 0 .35rem;
        }
      }
    }
    .recommend {
      h4 {
        font-size: .16rem;
        font-weight: normal;
        padding: 0 .15rem;
        margin-top: .2rem;
        margin-bottom: .1rem;
      }
    }
    .success {
      width: 2.83rem;
      height: 1.9rem;
      -webkit-border-radius: .06rem;
      -moz-border-radius: .06rem;
      border-radius: .06rem;
      text-align: center;
      padding-top: .46rem;
      h4 {
        font-size: .18rem;
        color: #e40011;
        margin-bottom: .17rem;
      }
      p {
        color: #666666;
        margin-bottom: .2rem;
      }
      .btn {
        width: 1.22rem;
        height: .36rem;
        -webkit-border-radius: .36rem;
        -moz-border-radius: .36rem;
        border-radius: .36rem;
        background-color: #e40011;
        color: #ffffff;
      }
    }
  }

</style>
