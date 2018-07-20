<template>
  <div id="home" @touchmove="touch($event)">
    <comHeader v-on:openPopup="openPopup"></comHeader>
    <div class="banner">
      <mt-swipe :auto="5000">
        <mt-swipe-item><img src="../../assets/images/home/1/b@2x.png"></mt-swipe-item>
        <mt-swipe-item><img src="../../assets/images/home/1/b@2x.png"></mt-swipe-item>
        <mt-swipe-item v-for="(banner,index) in bannerList" :key="index"><img :src="banner.image"></mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="menu">
      <!--<router-link :to="'/helpMe'" class="menu-list">-->
      <router-link :to="'/helpMe'" class="menu-list">
        <div class="menu-img">
          <img src="../../assets/images/home/2/bangwozhaoche@2x.png" alt="">
        </div>
        <p>帮我选车</p>
      </router-link>
      <router-link class="menu-list" :to="'/car/'+'newcar'">
        <div class="menu-img">
          <img src="../../assets/images/home/2/car@2x.png" alt="">
        </div>
        <p>提新车</p>
      </router-link>
      <router-link class="menu-list" :to="'/car/'+'usedcar'">
        <div class="menu-img">
          <img src="../../assets/images/home/2/ershouche@2x.png" alt="">
        </div>
        <p>提好车</p>
      </router-link>
      <div class="menu-list" @click="lowFirstPay()">
        <div class="menu-img">
          <img src="../../assets/images/home/2/zhifu@2x.png" alt="">
        </div>
        <p>低首付</p>
      </div>
      <router-link :to="'/service'" class="menu-list">
        <div class="menu-img">
          <img src="../../assets/images/home/2/fuwu@2x.png" alt="">
        </div>
        <p>服务保障</p>
      </router-link>
    </div>
    <div class="bb"></div>
    <div class="newcar-list">
      <div class="red_title">
        <p class='title'>品质提车·提新车</p>
        <div class="seeMore">查看更多</div>
      </div>
      <ul>
        <li class="carSearch">5万以下</li>
        <li class="carSearch">5-10万</li>
        <li class="carSearch">10-20万</li>
        <li class="carSearch">20万以上</li>
        <li class="carSearch">首付一万</li>
        <li class="carSearch">超低月供</li>
        <li class="carSearch"><span class='SUV'></span>SUV</li>
        <li class="carSearch"><span class='dazong'></span>大众</li>
        <li class="carSearch"><span class='benz'></span>奔驰</li>
        <li class="carSearch"><span class='baoma'></span>宝马</li>
        <li class="carSearch"><span class='aodi'></span>奥迪</li>
        <li class="carSearch"><span class='bentian'></span>本田</li>
        <li class="carSearch"><span class='fengtian'></span>丰田</li>
        <li class="carSearch"><span class='richan'></span>日产</li>
        <li class="carSearch"><span class='xuefulan'></span>雪佛兰</li>
        <li class="carSearch"><span class='more'></span>更多</li>
      </ul>
      <div class="bb"></div>
      <div class="sale-box">
        <div class="left">
          <p class="title">促销专区</p>
          <p class="des">精选福利 超重优惠</p>
          <p class="sale"></p>
        </div>
        <div class="right">
          <div class="r-top">
            <p class="title">新车热销</p>
            <p class="des">万众之选</p>
          </div>
          <div class="r-bottom">
            <p class="title">热门车型</p>
            <p class="des">万众之选</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bb"></div>
    <div class="transition-img"></div>
    <div class="usedcar-list">
      <div class="red_title">
        <p class='title'>精选二手车·提好车</p>
        <div class="seeMore">查看更多</div>
      </div>
      <ul>
        <li class="carSearch">准新车</li>
        <li class="carSearch">九成新</li>
        <li class="carSearch">八成新</li>
        <li class="carSearch">里程较少</li>
        <li class="carSearch">里程较多</li>
        <li class="carSearch">车况优秀</li>
        <li class="carSearch">车况良好</li>
        <li class="carSearch">车况一般</li>
        <li class="carSearch">5万以下</li>
        <li class="carSearch">5-10万</li>
        <li class="carSearch">10-20万</li>
        <li class="carSearch">20万以上</li>
        <li class="carSearch">首付一万</li>
        <li class="carSearch">超低月供</li>
        <li class="carSearch"><span class='SUV'></span>SUV</li>
        <li class="carSearch"><span class='dazong'></span>大众</li>
        <li class="carSearch"><span class='benz'></span>奔驰</li>
        <li class="carSearch"><span class='baoma'></span>宝马</li>
        <li class="carSearch"><span class='aodi'></span>奥迪</li>
        <li class="carSearch"><span class='bentian'></span>本田</li>
        <li class="carSearch"><span class='fengtian'></span>丰田</li>
        <li class="carSearch"><span class='richan'></span>日产</li>
        <li class="carSearch"><span class='xuefulan'></span>雪佛兰</li>
        <li class="carSearch"><span class='more'></span>更多</li>
      </ul>
      <div class="bb"></div>
      <div class="filter-box">
        <div class="top df">
          <div class="t-left">
            <p class='title'>省油代步车</p>
            <p class='des'>上班族的首选</p>
          </div>
          <div class="t-right">
            <p class='title'>千元月供车</p>
            <p class='des'>供车无压力</p>
          </div>
        </div>
        <div class="bottom df">
          <div class="b-left">
            <p class='title'>准新车</p>
            <p class='des'>买车首选</p>
          </div>
          <div class="b-center">
            <p class='title'>练手车</p>
            <p class='des'>五万以内好车</p>
          </div>
          <div class="b-right">
            <p class='title'>热门SUV</p>
            <p class='des'>首付一万起</p></div>
        </div>
      </div>
    </div>
    <div class="bb"></div>
    <div class="favcar-list">
      <div class="red_title">
        <p class='title'>低首付·好提车</p>
        <div class="seeMore">查看更多</div>
      </div>
      <ul>
        <li class='car-list' v-for='item in carList'>
          <div class="sale">
            <p>首付</p>
            <p>{{item.sale}}%</p>
          </div>
          <img src="../../assets/images/home/4/usedcar@2x.png" alt="">
          <p class="name">{{item.name}}</p>
          <p class="money">首付<b>{{item.money}}</b>万</p>
          <p class="month-pay">月供<i>{{item.monthPay}}</i>元</p>
        </li>
      </ul>
    </div>
    <div class="logo"></div>
    <div class="footer df">
      <div class="logo-box"></div>
      <div class="service">
        <span class='iconfont icon-service'></span>
        <p>客服</p>
      </div>
    </div>
    <div class="ewm">
      <div class="ewm-img"></div>
      <p>扫码下载APP</p>
    </div>
  </div>
</template>

<script>
  import comHeader from '../common/comHeader'
  import {mapState} from 'vuex'
  import Bus from '../common/bus'

  export default {
    name: "home",
    components: {
      'comHeader': comHeader
    },
    data() {
      return {
        isOpen: false,
        carList: [
          {name: '别克英朗', money: '1.1', monthPay: '3000', images: "/src/assets/images/home/4/usedcar@2x.png", sale: '1'},
          {name: '别克英朗', money: '1.2', monthPay: '3000', images: "/src/assets/images/home/4/usedcar@2x.png", sale: '2'},
          {name: '别克英朗', money: '1.3', monthPay: '3000', images: "/src/assets/images/home/4/usedcar@2x.png", sale: '3'},
          {name: '别克英朗', money: '1.4', monthPay: '3000', images: "/src/assets/images/home/4/usedcar@2x.png", sale: '4'},
          {name: '别克英朗', money: '1.5', monthPay: '3000', images: "/src/assets/images/home/4/usedcar@2x.png", sale: '5'},
          // {name: '别克英朗', money: '1.6', monthPay: '3000', images: "/src/assets/images/home/4/usedcar@2x.png",sale:'6'},
          // {name: '别克英朗', money: '1.7', monthPay: '3000', images: "/src/assets/images/home/4/usedcar@2x.png",sale:'7'},
        ],
        bannerList: [],
        newcarSaleList: [],
        usedcarSaleList: [],
      }
    },
    computed: {
      ...mapState({
        filter: state => state.filterData.filter,
        defList: state => state.filterData.defList,
      })
    },
    mounted() {
      //banner
      this.getBannerImg('0')
    },
    methods: {
      touch: function (event) {
        if (this.isOpen) {
          event.preventDefault()
        }
      },
      openPopup: function (data) {
        // console.log(data);
        this.isOpen = data

      },
      lowFirstPay: function () {
        let obj = {'value': '4', 'text': '首付最低', 'icon': 'icon-duigou', 'active': false, 'carType': 'newcar'}
        this.defList.forEach((v, i) => {
          v.active = false
        })
        this.defList[5].active = true
        this.$store.commit('changeDef', obj.value)
        Bus.$emit('changedDef', obj.text)
        this.filter[0].text = obj.text
        this.$router.push({path: '/car/usedcar'})
      },
      getBannerImg: function (type) {
        let that = this
        let url = this.$com.baseUrl + '/wx/car/getSortByType'
        this.$com.api(url, {'type': type}, (res) => {
          console.log(res);
          if (res.res_code == '0000') {
            if (type == '0') {
              that.bannerList = res.data
            } else if (type == '1') {
              that.newcarSaleList = res.data
            } else if (type == '2') {
              that.usedcarSaleList = res.data
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang='less'>
  #home {
    position: relative;
    .banner {
      width: 100%;
      height: 2.1rem;
      img {
        height: 2.1rem;
        width: 100%;
      }
    }
    .menu {
      display: flex;
      flex-flow: row nowrap;
      padding-top: .325rem;
      padding-bottom: .35rem;
      .menu-list {
        width: 20%;
        img {
          width: .45rem;
          height: .45rem;
          margin: 0 auto;
          display: block;
        }
        p {
          text-align: center;
        }
      }
    }
    .newcar-list, .usedcar-list, .favcar-list {
      .red_title {
        margin: 0 .05rem;
        margin-top: .18rem;
        margin-bottom: .24rem;
        height: .6rem;
        background-image: url('../../assets/images/home/3/bg@2x.png');
        -webkit-background-size: 100% .6rem;
        background-size: 100% .6rem;
        padding: 0 .075rem;
        position: relative;
        .title {
          font-size: .17rem;
          color: #ffffff;
          line-height: .6rem;
        }
        .seeMore {
          width: .9rem;
          height: .25rem;
          border-radius: .125rem;
          background-color: #ffffff;
          position: absolute;
          right: .075rem;
          top: 50%;
          transform: translateY(-50%);
          text-align: center;
          color: #e40011;
          line-height: .25rem;
        }
      }
      ul {
        padding: 0 .15rem;
        display: flex;
        flex-flow: row wrap;
        margin-bottom: .05rem;
        li {
          width: 25%;
          text-align: center;
          font-size: .14rem;
          color: #333333;
          margin-bottom: .24rem;

          span {
            display: inline-block;
            margin-right: .1rem;
            width: .23rem;
            height: .15rem;
            -webkit-background-size: .23rem .15rem;
            background-size: .23rem .15rem;
            vertical-align: text-top;

          }
          .SUV {
            background-image: url('../../assets/images/home/3/suv@2x.png')
          }
          .dazong {
            background-image: url('../../assets/images/home/3/dazong@2x.png')
          }
          .benz {
            background-image: url('../../assets/images/home/3/benz@2x.png')
          }
          .baoma {
            background-image: url('../../assets/images/home/3/baoma@2x.png')
          }
          .aodi {
            background-image: url('../../assets/images/home/3/aodi@2x.png')
          }
          .bentian {
            background-image: url('../../assets/images/home/3/bentian@2x.png')
          }
          .fengtian {
            background-image: url('../../assets/images/home/3/fengtian@2x.png')
          }
          .richan {
            background-image: url('../../assets/images/home/3/richan@2x.png')
          }
          .xuefulan {
            background-image: url('../../assets/images/home/3/xuefulan@2x.png')
          }
          .more {
            background-image: url('../../assets/images/home/3/more@2x.png')
          }
        }
      }
      .sale-box {
        display: flex;
        flex-flow: row nowrap;
        height: 2.05rem;
        .left {
          width: 1.75rem;
          border-right: .03rem solid #f5f5f5;
          background: url("../../assets/images/home/4/salecar@2x.png") no-repeat;
          background-position: 0 1.05rem;
          -webkit-background-size: 1.59rem 1.11rem;
          background-size: 1.59rem 1.11rem;
          padding-top: .19rem;
          padding-left: .15rem;
          .title {
            font-size: .2rem;
            color: #e40011;
          }
          .des {
            font-size: .13rem;
            color: #666;
            margin-bottom: .16rem;
          }
          .sale {
            width: .275rem;
            height: .275rem;
            background: url("../../assets/images/home/4/sale@2x.png") no-repeat;
            -webkit-background-size: .275rem;
            background-size: .275rem;
          }
        }
        .right {
          width: 2.01rem;
          div {
            height: 1.025rem;
          }
          .r-top {
            border-bottom: .03rem solid #f5f5f5;
            background: url("../../assets/images/home/4/newcar@2x.png") no-repeat;
            background-position: .9rem .44rem;
            -webkit-background-size: .94rem .44rem;
            background-size: .94rem .44rem;
            padding-top: .19rem;
            padding-left: .12rem;
            .title {
              font-size: .2rem;
              color: #fda638;
            }
            .des {
              font-size: .13rem;
              color: #666;
            }
          }
          .r-bottom {
            background: url("../../assets/images/home/4/hotcar@2x.png") no-repeat;
            background-position: .9rem .44rem;
            -webkit-background-size: .98rem .51rem;
            background-size: .98rem .51rem;
            padding-top: .19rem;
            padding-left: .12rem;
            .title {
              font-size: .2rem;
              color: #0ebded;
            }
            .des {
              font-size: .13rem;
              color: #666;
            }
          }
        }
      }
    }
    .transition-img {
      height: 1rem;
      background: url("../../assets/images/home/5/bg@2x.png") no-repeat;
      -webkit-background-size: 100% 1rem;
      background-size: 100% 1rem;
    }
    .usedcar-list {
      .filter-box {
        .top {
          height: 1.14rem;
          border-bottom: 1px solid #ddd;
          div {
            width: 50%;
            height: 100%;
            background: url("../../assets/images/home/4/usedcar@2x.png") no-repeat;
            background-position: .9rem .44rem;
            -webkit-background-size: .90rem .5rem;
            background-size: .90rem .5rem;
            padding-top: .245rem;
            padding-left: .15rem;
            .title {
              font-size: .17rem;
              color: #000;
            }
            .des {
              font-size: .12rem;
              color: #666;
            }
          }
          .t-left {
            border-right: 1px solid #ddd;
          }
        }
        .bottom {
          height: 1.35rem;
          div {
            width: 33.33%;
            border-right: 1px solid #ddd;
            background: url("../../assets/images/home/4/usedsuv@2x.png") no-repeat;
            background-position: .18rem .68rem;
            -webkit-background-size: .85rem .55rem;
            background-size: .85rem .55rem;
            padding-top: .2rem;
            padding-left: .15rem;
            .title {
              font-size: .17rem;
              color: #e40011;
            }
            .des {
              font-size: .12rem;
              color: #666;
            }
          }
          .b-center {
            padding-left: .275rem;
            background-position: .275rem .68rem;
          }
          .b-right {
            padding-left: .3rem;
            background-position: .3rem .68rem;
            border: 0;
          }
        }
      }
    }
    .favcar-list {
      ul {
        display: flex;
        flex-flow: row wrap;
        padding: 0;
        li {
          width: 33.33%;
          height: 1.375rem;
          margin-bottom: .25rem;
          padding-left: .15rem;
          text-align: left;
          .sale {
            width: .3rem;
            height: .28rem;
            background: url("../../assets/images/home/4/salebg@2x.png") no-repeat;
            -webkit-background-size: .3rem .28rem;
            background-size: .3rem .28rem;
            p {
              font-size: .1rem;
              color: #ffffff;
              line-height: .12rem;
              text-align: center;
            }
          }
          img {
            width: .9rem;
            margin-bottom: .05rem;
          }
          .name {
            font-size: .14rem;
            color: #000;
          }
          .money {
            font-size: .11rem;
            color: #e40011;
            b {
              font-size: .15rem;
              font-weight: 400;
            }
          }
          .month-pay {
            color: #666;
            font-size: .11rem;
          }
        }
      }
    }
    .logo {
      margin-top: .5rem;
      width: 2.6rem;
      height: .6rem;
      margin: 0 auto;
      background: url("../../assets/images/home/5/logo@2x.png") no-repeat;
      -webkit-background-size: 2.6rem .6rem;
      background-size: 2.6rem .6rem;
      margin-bottom: 1rem;
    }
    .footer {
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0;
      margin-top: .25rem;
      height: .5rem;
      border-top: 1px solid #ddd;
      z-index: 144;
      background-color: #fff;
      .logo-box {
        margin-top: 7px;
        margin-left: 1.14rem;;
        /*width: 1.625rem;*/
        width: 100%;
        height: .42rem;
        background: url("../../assets/images/home/5/gg@2x.png") no-repeat;
        -webkit-background-size: 1.625rem .42rem;
        background-size: 1.625rem .42rem;
      }
      .service {
        min-width: .3rem;
        height: 100%;
        color: #333;
        margin-right: .18rem;
        text-align: center;
        span {
          font-size: .3rem;
        }
        p {
          font-size: .12rem;
          line-height: .08rem;
        }
      }
    }
    .ewm {
      position: fixed;
      left: .22rem;
      bottom: 0;
      z-index: 145;
      .ewm-img {
        width: .64rem;
        height: .64rem;
        background-color: #000;
      }
      p {
        font-size: .11rem;
        color: #333333;
      }
    }
  }

</style>
