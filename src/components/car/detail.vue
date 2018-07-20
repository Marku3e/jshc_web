<template>
  <div id="detail">
    <sHeader :title="title"></sHeader>
    <div class="body">
      <div class="swipe">
        <div class='pagination'>
          {{page}}/{{imgList.length}}
        </div>
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for='(item,index) in imgList' :key='index'>
            <img :src="item.image_id">

          </swiper-slide>
        </swiper>
      </div>
      <div class="defInfo">
        <div class="carName">{{carDetail.modelName}}</div>
        <div class="usedCarPrice" v-if='isUsedCar'>
          指导价: <span>{{carDetail.price}}万</span> &nbsp;<i>{{carDetail.modelPrice}}万</i>
        </div>
        <div class="newCarPrice" v-if='!isUsedCar'>
          厂家指导价: <span>{{carDetail.modelPrice}}万</span>
        </div>
        <div class="getCar">
          <div class="icon"></div>
          <div class="pay">
            首付<span>{{carDetail.firstPay}}</span>万
            月供<span>{{carDetail.monthRepay}}</span>元
          </div>
          <router-link :to="'/car/appoint/'+carDetailId" class="extractCar">
            我要提车<span class='iconfont icon-go'></span>
          </router-link>
        </div>
      </div>
      <div class="bb"></div>
      <div class="basicInfo">
        <div class="title">
          <span></span> 基本信息
        </div>
        <div class="usedcarInfo" v-if='isUsedCar'>
          <ul>
            <li>
              <h4>行驶里程</h4>
              <p>{{carDetail.mileage}}万公里</p>
            </li>
            <li>
              <h4>上牌时间</h4>
              <p>{{carDetail.pDate}}</p>
            </li>
            <li>
              <h4>上牌地</h4>
              <p>{{carDetail.city}}</p>
            </li>
            <li>
              <h4>排量</h4>
              <p>{{carDetail.displacement}}L</p>
            </li>
            <li>
              <h4>排放标准</h4>
              <p>{{carDetail.standard}}</p>
            </li>
            <li>
              <h4>变速箱</h4>
              <p>{{carDetail.gearBox}}</p>
            </li>
          </ul>
        </div>
        <div class="newcarInfo" v-if='!isUsedCar'>
          <ul>
            <li>
              <p class="name">厂商</p>
              <p>{{carParam.manufacturer}}</p>
            </li>
            <li>
              <p class="name">车型</p>
              <p>{{carParam.level}}</p>
            </li>
            <li>
              <p class="name">发动机</p>
              <p>{{carParam.engine}}</p>
            </li>
            <li>
              <p class="name">变速箱</p>
              <p>{{carParam.gearbox}}</p>
            </li>
            <li>
              <p class="name">长*宽*高 (mm)</p>
              <p>{{carParam.size}}</p>
            </li>
            <li>
              <p class="name">车身结构</p>
              <p>{{carParam.structure}}</p>
            </li>
            <li>
              <p class="name">最高车速 (km/h)</p>
              <p>{{carParam.maxSpeed}}</p>
            </li>
            <li>
              <p class="name">综合油耗 (L/100km)</p>
              <p>{{carParam.consumption}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="bb"></div>
      <div class="carImg">
        <div class="title">
          <span></span> 车辆实拍
        </div>
        <div class="imgList">
          <ul>
            <li v-for="(item,index) in imgList" :key='index'>
              <div class="caption">{{item.title}}</div>
              <img :src="item.image_id" alt="">
            </li>
          </ul>
        </div>
      </div>
      <div class="bb"></div>
      <div class="recommend">
        <div class="title">
          <span></span> 热门推荐
        </div>
        <div class="swiper">
          <swiper :options="recommendSwiperOpt">
            <swiper-slide v-for="(item,index) in recommendList" :key='index'>
              <router-link :to="'/car/detail/'+item.id">
                <img
                  :src="item.image">
                <div class="text">
                  <h4>{{item.modelName}}</h4>
                  <p class='money'>厂商指导价: <span>{{item.price}}</span>万 </p>
                  <p class='firstPay'>首付<i>{{item.firstPay}}</i>万 月供<span>{{item.monthPay}}</span>元</p>
                </div>
              </router-link>
            </swiper-slide>
            <swiper-slide style="opacity: 0">

            </swiper-slide>
          </swiper>
        </div>
      </div>
      <div class="bb"></div>
      <div class="featrue">
        <div class="title">
          <span></span> 产品特色
        </div>
        <div class="defFeatrue">
          <div class="yi">
            <div class="left"></div>
            <div class="right">
              <h4>易</h4>
              <p>两证一卡 易审批</p>
            </div>
          </div>
          <div class="di">
            <div class="left"></div>
            <div class="right">
              <h4>低</h4>
              <p>贷款购车 费用低</p>
            </div>
          </div>
          <div class="kuai">
            <div class="left"></div>
            <div class="right">
              <h4>快</h4>
              <p>流程简单 提车快</p>
            </div>
          </div>
          <div class="quan">
            <div class="left"></div>
            <div class="right">
              <h4>全</h4>
              <p>购车养车 服务全</p>
            </div>
          </div>
        </div>
        <div class="compare">
          <h4></h4>
          <div class="reason">
            <div class="left">
              <p><i>易,</i> 两证一卡 审批易</p>
              <p><i>低,</i> 贷款首付 月供低</p>
              <p><i>快,</i> 流程简便 提车快</p>
              <p><i>全,</i> 购车养车 服务全</p>
            </div>
            <div class="right">
              <p>过审复杂材料多</p>
              <p>贷款首付月供高</p>
              <p>订车提车周期长</p>
              <p>车型选择余地少</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <div class="option">
        <div class="collect" @click="collect()">
          <span class='iconfont' :class="isCollect=='0'?'icon-02':'icon-aixin'"
                :style="isCollect=='1'?{color:'#e40011'}:''"></span>
          收藏
        </div>
        <div class="call" @click='callMe()'>
          <span class='telephone'></span>
          咨询
        </div>
      </div>
      <router-link :to="'/car/appoint/'+carDetailId" class="apm">预约到店</router-link>
    </footer>
  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import sHeader from '../common/smallHeader'
  import {Toast} from 'mint-ui'


  export default {
    name: "detail",
    components: {
      swiper,
      swiperSlide,
      sHeader
    },
    watch: {
      '$route': function (val) {
        console.log(val);
        if (val.params.id) {
          window.location.reload()
        }

      }
    },
    data() {
      return {
        title: "车辆详情",
        carDetail: {},
        carParam: {},
        imgList: [],
        titleList: ['车头正前方', '车头方向45°', '车尾方向45°', '车尾正前方', '车身正面',
          '前车门打开', '后车座椅', '驾驶室内饰', '打开引擎盖', '其他照片',],
        recommendList: [
          {
            'name': '吉利远景',
            'img': 'https://img.souche.com/20171016/JPG/f4f435a29b0cefa329331349f1c7c087.JPG?x-oss-process=image/format,webp',
            'money': 16.5,
            'firstPay': 1.2,
            'monthPay': 2560
          }, {
            'name': '吉利远景',
            'img': 'https://img.souche.com/20171016/JPG/f4f435a29b0cefa329331349f1c7c087.JPG?x-oss-process=image/format,webp',
            'money': 16.5,
            'firstPay': 1.2,
            'monthPay': 2560
          }, {
            'name': '吉利远景',
            'img': 'https://img.souche.com/20171016/JPG/f4f435a29b0cefa329331349f1c7c087.JPG?x-oss-process=image/format,webp',
            'money': 16.5,
            'firstPay': 1.2,
            'monthPay': 2560
          }, {
            'name': '吉利远景',
            'img': 'https://img.souche.com/20171016/JPG/f4f435a29b0cefa329331349f1c7c087.JPG?x-oss-process=image/format,webp',
            'money': 16.5,
            'firstPay': 1.2,
            'monthPay': 2560
          }, {
            'name': '吉利远景',
            'img': 'https://img.souche.com/20171016/JPG/f4f435a29b0cefa329331349f1c7c087.JPG?x-oss-process=image/format,webp',
            'money': 16.5,
            'firstPay': 1.2,
            'monthPay': 2560
          }, {
            'name': '吉利远景',
            'img': 'https://img.souche.com/20171016/JPG/f4f435a29b0cefa329331349f1c7c087.JPG?x-oss-process=image/format,webp',
            'money': 16.5,
            'firstPay': 1.2,
            'monthPay': 2560
          }, {
            'name': '吉利远景',
            'img': 'https://img.souche.com/20171016/JPG/f4f435a29b0cefa329331349f1c7c087.JPG?x-oss-process=image/format,webp',
            'money': 16.5,
            'firstPay': 1.2,
            'monthPay': 2560
          }, {
            'name': '吉利远景',
            'img': 'https://img.souche.com/20171016/JPG/f4f435a29b0cefa329331349f1c7c087.JPG?x-oss-process=image/format,webp',
            'money': 16.5,
            'firstPay': 1.2,
            'monthPay': 2560
          },
        ],
        swiperOption: {
          notNextTick: true,
          autoplay: true,
          // loop: true,
          observeParents: true,
          effect: "coverflow",
          direction: 'horizontal',
        },
        recommendSwiperOpt: {
          notNextTick: true,
          // autoplay: true,
          // loop: true,
          observeParents: true,
          direction: 'horizontal',
          slidesPerView: "2.3",
          spaceBetween: 14,
        },
        page: '1',
        isUsedCar: true,
        isCollect: '0',
        carDetailId: this.$route.params.id
      }
    },
    mounted() {
      // this.page = this.swiper.activeIndex
      this.swiper.on('slideChangeTransitionEnd', () => {
        this.page = this.swiper.activeIndex + 1
      })
      this.getCarDetail()
      this.getrecommendList()
      console.log(this.carDetailId);
      // console.log(this.isUsedCar);
    }
    ,
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }

    },
    created() {

    },
    methods: {
      getCarDetail: function () {
        let carDetailId = this.carDetailId
        // console.log(carDetailId);
        let userId = localStorage.getItem('jshc_id')
        let data = {}
        data['carDetailId'] = carDetailId
        if (userId) {
          data['userId'] = userId
        }


        let that = this
        let url = that.$com.baseUrl + '/wx/car/getCarDetail'
        that.$com.api(url, data, (res) => {
          console.log(res);
          if (res.res_code == '0000') {
            that.isCollect = res.data.isCollect
            let type = res.data.carDetail.carTypeStr
            if (type == '二手车' || type == '自有二手车') {
              that.isUsedCar = true
            } else {
              that.isUsedCar = false
              that.carParam = res.data.carParam
            }
            that.imgList = res.data.carImage
            that.carDetail = res.data.carDetail
            that.imgList.forEach((v, i) => {
              that.imgList[i].title = that.titleList[i]
            })
          }
        })
      },
      callMe: function () {
        // window.location.href=''
        console.log(1);
      },
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
      collect: function () {
        if (localStorage.getItem('jshc_accessToken') != 'agreeLogin'
          || !localStorage.getItem('jshc_token')
          || !localStorage.getItem('jshc_id')
          || !localStorage.getItem('jshc_userName')) {
          this.$router.push({path: '/login'})
          // console.log('前往登录');
        }
        let that = this
        let carDetailId = this.carDetailId
        let userId = localStorage.getItem('jshc_id')
        let url = ''
        if (this.isCollect == '1') {
          url = this.$com.baseUrl + '/wx/car/delMyCollectionCar'
        } else {
          url = this.$com.baseUrl + '/wx/car/saveCollectionCar'
        }
        this.$com.api(url, {'userId': userId, 'carDetailId': carDetailId}, (res) => {
          console.log(res);
          if (res.res_code == '0000') {
            that.isCollect == '1' ? that.isCollect = '0' : that.isCollect = '1'


          } else {
            Toast({
              message: res.res_msg,
              position: 'center',
              duration: 1400
            });
          }
        })
      },

    }
  }
</script>

<style scoped lang='less'>
  #detail {
    header {
      width: 100%;
      height: .5rem;
      border-bottom: 1px solid #e9e9e9;
      padding: 0 .15rem;
      display: flex;
      line-height: .5rem;
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
    .body {
      padding-bottom: .5rem;
      .swipe {
        height: 2.04rem;
        position: relative;
        .swiper-container {
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
          }

        }
        .pagination {
          position: absolute;
          left: .15rem;
          bottom: .12rem;
          color: #ffffff;
          font-size: .15rem;
          z-index: 144;
        }
        /*background-color: #000000;*/
      }
      .defInfo {
        padding: 0 .15rem;
        .carName {
          font-size: .17rem;
          margin-top: .08rem;
          line-height: .4rem;
        }

        .newCarPrice, .usedCarPrice {
          font-size: .13rem;
          color: #666666;
          line-height: .2rem;
          margin-bottom: .12rem;
          span {
            font-size: .19rem;
            color: #e40011;
          }
          i {
            font-size: .13rem;
            color: #999999;
            text-decoration: line-through;
          }
        }
        .getCar {
          width: 100%;
          height: .45rem;
          display: flex;
          border: 1px solid #e40011;
          background-color: rgba(228, 0, 17, .1);
          margin-bottom: .22rem;
          padding: .06rem 0;
          padding-left: .14rem;
          padding-right: .09rem;
          justify-content: space-between;
          .icon {
            width: .32rem;
            height: .32rem;
            background-image: url('../../assets/images/other/logo@2x.png');
            -webkit-background-size: .32rem;
            background-size: .32rem;
            background-repeat: no-repeat;
            margin: auto 0;
          }
          .pay, .extractCar {
            line-height: .32rem;
            color: #e40011;
          }
          .pay {
            margin-right: .27rem;
            font-size: .13rem;
          }
          .extractCar {
            font-size: .15rem;
            span {
              font-size: .12rem;
            }
          }
        }
      }
      .title {
        display: flex;
        font-size: .17rem;
        height: .54rem;
        line-height: .54rem;
        border-bottom: 1px solid #e9e9e9;
        padding: 0 .15rem;
        span {
          width: .06rem;
          height: .21rem;
          background-color: #e40011;
          display: block;
          margin: auto 0;
          margin-right: .05rem;
        }
      }
      .basicInfo {
        padding-bottom: .41rem;
        .usedcarInfo {
          padding: 0rem .15rem;
          padding-top: .27rem;
          ul {
            display: flex;
            flex-flow: wrap row;
            justify-content: space-between;
            li {
              margin-bottom: .35rem;
              &:first-child {
                width: 40%;
              }
              &:nth-of-type(4) {
                width: 40%;
              }
              &:nth-of-type(3n-1) {
                width: 40%;
              }
              &:nth-of-type(n+3) {
                margin-bottom: 0;
              }

              h4 {
                font-size: .13rem;
                color: #666666;
                font-weight: 400;
                margin-bottom: .1rem;
              }
              p {
                font-size: .16rem;
              }
            }
          }
        }
        .newcarInfo {
          padding: 0 .15rem;
          ul {
            li {
              font-size: .15rem;
              color: #666666;
              height: .52rem;
              line-height: .52rem;
              display: flex;
              justify-content: space-between;
              border-bottom: 1px solid #e9e9e9;
              .name {
                color: #333333;
              }
            }
          }
        }
      }
      .carImg {
        .imgList {
          padding: 0 .15rem;
          .caption {
            font-size: .15rem;
            line-height: .4rem;
          }
          img {
            width: 100%;
            height: 2.03rem;
          }
        }
      }
      .recommend {
        .swiper {
          padding: .25rem 0;
          padding-left: .15rem;
          height: 2.45rem;
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
                height: .95rem;
                border-radius: 4px;

              }
              .text {
                padding-left: .08rem;
                h4 {
                  font-size: .16rem;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .money {
                  font-size: .12rem;
                  color: #999999;
                  margin: .05rem 0;
                }
                .firstPay {
                  font-size: .12rem;
                  color: #e40011;
                  i {
                    font-size: .16rem;
                  }
                }
              }
            }
          }
        }
      }
      .featrue {
        .defFeatrue {

          padding: 0 .15rem;
          display: flex;
          flex-flow: row wrap;
          > div {
            margin-top: .32rem;
            width: 50%;
            height: .45rem;
            display: flex;
            .left {
              width: .45rem;
              height: 100%;
              background-image: url("../../assets/images/other/yi@2x.png");
              background-repeat: no-repeat;
              -webkit-background-size: .45rem 100%;
              background-size: .45rem 100%;
              margin-right: .15rem;
            }
            .right {
              h4 {
                font-size: .15rem;
                font-weight: 400;
              }
              p {
                font-size: .12rem;
                color: #666666;
              }
            }
          }
          .di {
            .left {
              background-image: url("../../assets/images/other/di@2x.png");
            }
          }
          .kuai {
            .left {
              background-image: url("../../assets/images/other/kuai@2x.png");
            }
          }
          .quan {
            .left {
              background-image: url("../../assets/images/other/quan@2x.png");
            }
          }
        }
        .compare {
          padding: 0 .15rem;
          h4 {
            width: 100%;
            height: .45rem;
            margin-top: .5rem;
            margin-bottom: .15rem;
            background: url("../../assets/images/other/compare.png") no-repeat;
            -webkit-background-size: 100% .45rem;
            background-size: 100% .45rem;
          }
          .reason {
            display: flex;
            padding-bottom: .62rem;
            p {
              line-height: .325rem
            }
            .left {
              padding-left: .43rem;
              padding-right: .12rem;
              border-right: 1px solid #dddddd;
              p {
                font-size: .14rem;
                i {
                  font-size: .15rem;
                  color: #e40011;
                }
              }
            }
            .right {
              font-size: .14rem;
              color: #666666;
              padding-left: .15rem;
            }
          }
        }
      }
    }
    footer {
      width: 100%;
      height: .5rem;
      border-top: 1px solid #dddddd;
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      line-height: .5rem;
      text-align: center;
      background-color: #fff;
      z-index: 144;
      .option {
        width: 1.75rem;
        display: flex;
        .collect {
          width: 50%;
          border-right: 1px solid #ddd;
        }
        .call {
          width: 50%;
          .telephone {
            display: inline-block;
            width: .16rem;
            height: .2rem;
            background-image: url('../../assets/images/other/dianhua@2x.png');
            -webkit-background-size: .16rem .2rem;
            background-size: .14rem .18rem;
            background-repeat: no-repeat;
            vertical-align: middle;
          }
        }
      }
      .apm {
        width: 2rem;
        background-color: #e40011;
        color: #ffffff;
      }
    }
  }

</style>
