<template>
  <div id="appoint">
    <sHeader :title="title"></sHeader>
    <div class="bb"></div>
    <div class="car">
      <div class="carCell">
        <router-link class="carInfo" :to="'/car/detail/'+carDetailId">
          <div class="img">
            <img :src="carDetail.image" alt="">
          </div>
          <div class="text">
            <div class="title">{{carDetail.modelName}}</div>
            <div class="carInfo">
              <i>{{carDetail.cityName}}</i>&nbsp; | &nbsp; <i>{{carDetail.plateTime}}</i>年 &nbsp;| &nbsp; <i>{{carDetail.mile}}</i>万公里
            </div>
            <div class="pirce">
              <div class="salePirce"><i>{{carDetail.priceStr}}</i>万</div>
              <div class="oriPirce"><i>{{carDetail.modelPrice}}</i>万</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="bb"></div>
    <div class="appointForm" v-show="isSuccess">
      <div class="appointTime">
        <div class="title">预约时间</div>
        <!--<datetime-range title :start-date="startTime"-->
        <!--end-date="2038-01-01" format="YYYY-MM-DD"-->
        <!--v-model="value"-->
        <!--@on-change="onChange"-->
        <!--placeholder='请选择预约时间'-->
        <!--class='timePicker'>-->

        <!--</datetime-range>-->
        <input type="date" @input="changeDate($event)" id='dateIpt' :readonly="isDisable">
        <label for="dateIpt" :class="dateStr != '请选择预约时间'?'blackColor':''">{{dateStr}}</label>
      </div>
      <div class="phoneNo">
        <div class="title">手机号</div>
        <input type="number" v-model="phone" placeholder='请输入手机号码' :readonly="isDisable">
      </div>
      <div class="code">
        <input type="number" placeholder='请输入验证码' v-model="psw">
        <button @click="getVerificationCode()" :disabled="isDisable">{{code}}</button>
      </div>
      <mt-button class='btn' @click='appiont()' :disabled="isSend">立即预约</mt-button>
    </div>
    <div class="appSuccess" v-show="!isSuccess">
      <div class="title">
        <div class="text">
          <span class='iconfont icon-success'></span><h4>预约成功</h4>
        </div>
      </div>
      <p>您的预约看车已申请成功,稍后会有工作人员与您联系, 请您保持手机通畅</p>
      <ul>
        <li>
          <div class="infoTitle">看车时间:</div>
          <p>{{dateCut}}</p>
        </li>
        <li>
          <div class="infoTitle">看车地点:</div>
          <p>{{storeName}}</p>
        </li>
        <li>
          <div class="infoTitle">携带资料:</div>
          <p>身份证、驾照(如需试驾请携带)、银行卡或存折(退款或退还保证金所需)</p>
        </li>
      </ul>
      <mt-button class='btn'>查看订单</mt-button>
    </div>
    <div class="bb" v-show="!isSuccess"></div>
    <div class="small-banner" v-show="!isSuccess">
      <div class="title">
        <fieldset>
          <legend>其他人还看了</legend>
        </fieldset>
      </div>
      <div class="recommend">
        <div class="swiper">
          <swiper :options="recommendSwiperOpt">
            <swiper-slide v-for="(item,index) in recommendList" :key='index'>
              <img
                :src="item.image">
              <div class="text">
                <h4>{{item.modelName}}</h4>
                <div><span><i>{{item.price}}</i>万起</span> <span>{{item.people}}收藏</span></div>
              </div>
            </swiper-slide>
            <swiper-slide style="opacity: 0">

            </swiper-slide>
          </swiper>
        </div>
      </div>

    </div>
    <!--<spinner type="bubbles" size=".5rem"></spinner>-->
  </div>
</template>

<script>
  import sHeader from '../common/smallHeader'
  import {Group, DatetimeRange, Spinner} from 'vux'
  import {Toast} from 'mint-ui';
  import {swiper, swiperSlide} from 'vue-awesome-swiper'


  // let date = new Date()
  // let nowDate = date.getFullYear() + '-' + parseInt(date.getMonth() + 1) + '-' + parseInt(date.getDay() + 1)
  export default {
    name: "appoint",
    components: {
      sHeader,
      DatetimeRange,
      Group,
      Spinner,
      swiper,
      swiperSlide,
    },

    data() {
      return {
        title: '预约到店',
        carDetail: {},
        dateStr: '请选择预约时间',
        phone: '',
        psw: '',
        isDisable: false,
        code: '获取验证码',
        value: [],
        carDetailId: this.$route.params.id,
        isSend: true,
        isSuccess: true,
        storeName: '',
        datePicker: '',
        recommendSwiperOpt: {
          notNextTick: true,
          // autoplay: true,
          // loop: true,
          observeParents: true,
          direction: 'horizontal',
          slidesPerView: "2",
          spaceBetween: 14,
        },
        recommendList: [
          {
            'name': '吉利远景 吉利远景 吉利远景',
            'img': 'https://img.souche.com/20171016/JPG/f4f435a29b0cefa329331349f1c7c087.JPG?x-oss-process=image/format,webp',
            'money': 16.5,
            'people': 120,
            'monthPay': 2560
          }, {
            'name': '吉利远景',
            'img': 'https://img.souche.com/20171016/JPG/f4f435a29b0cefa329331349f1c7c087.JPG?x-oss-process=image/format,webp',
            'money': 16.5,
            'people': 120,
            'monthPay': 2560
          }, {
            'name': '吉利远景',
            'img': 'https://img.souche.com/20171016/JPG/f4f435a29b0cefa329331349f1c7c087.JPG?x-oss-process=image/format,webp',
            'money': 16.5,
            'people': 120,
            'monthPay': 2560
          }, {
            'name': '吉利远景',
            'img': 'https://img.souche.com/20171016/JPG/f4f435a29b0cefa329331349f1c7c087.JPG?x-oss-process=image/format,webp',
            'money': 16.5,
            'people': 120,
            'monthPay': 2560
          }, {
            'name': '吉利远景',
            'img': 'https://img.souche.com/20171016/JPG/f4f435a29b0cefa329331349f1c7c087.JPG?x-oss-process=image/format,webp',
            'money': 16.5,
            'people': 120,
            'monthPay': 2560
          }, {
            'name': '吉利远景',
            'img': 'https://img.souche.com/20171016/JPG/f4f435a29b0cefa329331349f1c7c087.JPG?x-oss-process=image/format,webp',
            'money': 16.5,
            'people': 120,
            'monthPay': 2560
          }, {
            'name': '吉利远景',
            'img': 'https://img.souche.com/20171016/JPG/f4f435a29b0cefa329331349f1c7c087.JPG?x-oss-process=image/format,webp',
            'money': 16.5,
            'people': 120,
            'monthPay': 2560
          }, {
            'name': '吉利远景',
            'img': 'https://img.souche.com/20171016/JPG/f4f435a29b0cefa329331349f1c7c087.JPG?x-oss-process=image/format,webp',
            'money': 16.5,
            'people': 120,
            'monthPay': 2560
          },
        ],

      }
    },
    mounted() {
      // this.textAlign()
      console.log(this.carDetailId);
      this.getCarDetail()
      this.getrecommendList()
    },
    computed: {
      dateCut: function () {
        if (this.dateStr != '请选择预约时间') {
          return this.dateStr.substring(5).replace('-', '月') + '日'
        }
      }
    },
    methods: {
      // onChange(val) {
      //   console.log('change', val)
      // },
      // textAlign: function () {
      //   let dom = document.getElementsByClassName('vux-popup-picker-select')
      //   dom[0].style.textAlign = 'left'
      // },
      getrecommendList: function () {
        let url = this.$com.baseUrl + '/wx/car/getHotCars'
        let that = this
        this.$com.api(url, {}, (res) => {
          console.log(res);
          if (res.res_code == '0000') {
            that.recommendList = res.data
          }
        })
      },
      getCarDetail: function () {
        let that = this
        let url = this.$com.baseUrl + '/wx/car/getByCarDetailId'
        this.$com.api(url, {'carDetailId': this.carDetailId}, (res) => {
          console.log(res);
          if (res.res_code == '0000') {
            that.carDetail = res.data
            that.carDetail.plateTime = that.carDetail.plateTime.substring(0,4)

          } else {
            Toast({
              message: res.res_msg,
              position: 'center',
              duration: 1400
            });
          }
        })
      },
      getVerificationCode: function () {
        let that = this
        if (this.phone.length == 11) {
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
          this.code = 10 + 's'
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
      },
      changeDate: function (event) {
        this.dateStr = event.target.value
        console.log(this.dateCut);
      },
      appiont: function () {
        let that = this
        let url = this.$com.baseUrl + '/common/checkSmsCode'
        let appiontUrl = this.$com.baseUrl + '/wx/car/saveCarReserve'
        this.$com.api(url, {'phone': this.phone, 'code': this.psw}, (res) => {
          if (res.res_code == '200') {
            that.$com.api(appiontUrl, {
              'carDetailId': that.carDetailId,
              'phone': that.phone,
              'userId': localStorage.getItem('jshc_userId'),
              'applyTime': that.dateStr
            }, (result) => {
              console.log(result);
              if (result.res_code == '0000') {
                that.storeName = result.res_msg
                that.isSuccess = false;

              }
            })
          }
        })
      }

    }
  }
</script>

<style scoped lang='less'>
  #appoint {
    .car {
      padding: 0 .15rem;
      .carCell {
        width: 100%;
        padding: .21rem 0;
        display: flex;
        flex-flow: row nowrap;

        .edit {
          position: relative;
          width: .15rem;
          margin-right: .15rem;
          input[type='checkbox'] {
            position: absolute;
            left: 0;
            top: 0;
            width: .15rem;
            height: .15rem;
            opacity: 0;

          }
          label {
            position: absolute;
            left: .3rem;
            top: 50%;
            transform: translateY(-50%);
            height: .15rem;
            line-height: .15rem;
            &:before {
              content: "";
              position: absolute;
              left: -.3rem;
              top: 0;
              width: .15rem;
              height: .15rem;
              border: 1px solid #ddd;
              -webkit-border-radius: 50%;
              -moz-border-radius: 50%;
              border-radius: 50%;
              -webkit-transition: all .3s ease;
              -moz-transition: all .3s ease;
              -ms-transition: all .3s ease;
              -o-transition: all .3s ease;
              transition: all .3s ease;
            }
            &:after {
              content: '';
              position: absolute;
              left: -.24rem;
              top: .02rem;
              width: .04rem;
              height: .1rem;
              border: 0;
              border-right: 1px solid #fff;
              border-bottom: 1px solid #fff;
              background: #fff;
              transform: rotate(45deg);
              -webkit-transform: rotate(45deg);
              -moz-transform: rotate(45deg);
              -ms-transform: rotate(45deg);
              transition: all 0.3s ease;
              -webkit-transition: all 0.3s ease;
              -moz-transition: all 0.3s ease;

            }
          }
          input[type='checkbox']:checked + label:before {
            background: #e40011;
            border-color: #e40011;
          }
          input[type='checkbox']:checked + label:after {
            background: #e40011;
          }
        }
        .carInfo {
          display: flex;
          .img {
            width: 1.25rem;
            height: .86rem;
            min-width: 1.25rem;
            margin-right: .16rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .text {
            .title {
              font-size: 15px;
              font-weight: 700;
            }
            .factoryPirce, .carInfo {
              font-size: .12rem;
              color: #999;
              line-height: .24rem;
              i {
                font-size: .12rem;
              }
            }
            .pirce {
              display: flex;
              color: #e40011;
              font-size: .12rem;
              .monthPay {
                margin-left: .23rem;
              }
              .salePirce {
                font-size: .12rem;
                margin-right: .08rem;
                i {
                  font-size: .15rem;
                }
              }
              .oriPirce {
                font-size: .12rem;
                color: #999999;
                line-height: .21rem;
                text-decoration: line-through;
                i {
                  font-size: .12rem;
                }
              }
            }
          }
        }

      }
    }
    .appointForm {
      padding: 0 .15rem;
      padding-top: .55rem;
      > div {
        height: .5rem;
        border-bottom: 1px solid #dddddd;
        line-height: .5rem;
        display: flex;
        justify-content: space-between;
        .timePicker {
          width: 100%;
          padding: 0;
          .vux-popup-picker-select {
            text-align: left;
          }
          .weui-cell {
            padding: 0;
          }
          .weui-cell.vux-tap-active.weui-cell_access {
            padding: 0;
          }
        }
        .title {
          min-width: 1rem;
        }
      }
      .appointTime {
        position: relative;
        input {
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
        }
        label {
          width: 100%;
          height: .5rem;
          line-height: .5rem;
          color: #999999;
          &.blackColor {
            color: #000000;
          }
        }
      }
      .phoneNo, .code {
        width: 100%;
        height: .5rem;
        border-bottom: 1px solid #ddd;
        input {
          outline: none;
          border: none;
          width: 100%;
          height: 100%;
          /*padding-left: .1rem;*/
          /*padding-top: .3rem;*/
        }
        button {
          min-width: .87rem;
          height: .325rem;
          margin-top: .075rem;
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
    .btn {
      width: 100%;
      height: .5rem;
      -webkit-border-radius: .5rem;
      -moz-border-radius: .5rem;
      border-radius: .5rem;
      background-color: #e40011;
      color: #ffffff;
      margin-top: .31rem;
    }
    .appSuccess {
      padding: 0 .15rem;
      .title {
        padding: .35rem 0;
        .text {
          display: flex;
          justify-content: center;
          span {
            font-size: .21rem;
            color: #3CB371;
            margin-right: .05rem;
          }
          h4 {
            font-size: .17rem;
          }
        }
      }
      > p {
        font-size: .15rem;
        color: #333333;
        margin-bottom: .35rem;
      }
      > ul {
        li {
          display: flex;
          &:nth-of-type(2) {
            margin: .2rem 0;
          }
          .infoTitle {
            min-width: .7rem;

          }
        }
      }
      .btn {
        margin: .4rem 0;
      }
    }
    .small-banner {
      padding: 0 .15rem;
      .title {
        padding: 0rem .5rem;
        margin: .24rem 0;
        fieldset {
          border: none;
          border-top: 1px solid #000;
          text-align: center;
          legend {
            padding: 0 .15rem;
            font-size: .16rem;
          }
        }
      }
      .recommend {
        .swiper {
          padding: .25rem 0;
          padding-left: .15rem;
          .swiper-container {
            height: 100%;
            padding-bottom: .06rem;
            .swiper-slide {
              box-shadow: .03rem .03rem .04rem rgba(0, 0, 0, 0.3);
              background-color: #ffffff;
              border-radius: 4px;
              &:last-child {
                margin-right: .05rem;
              }
              img {
                width: 100%;
                height: 1.1rem;
                border-radius: 4px;

              }
              .text {
                padding: 0 .08rem;
                h4 {
                  font-size: .14rem;
                  font-weight: normal;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                div {
                  display: flex;
                  justify-content: space-between;
                  span {
                    color: #e40011;
                    font-size: .14rem;
                    line-height: 30px;
                    &:last-child {
                      color: #999999;
                    }
                    i {
                      font-size: .16rem;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

</style>
