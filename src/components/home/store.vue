<template>
  <div id="store">
    <sHeader :title="title"></sHeader>
    <div class="container">
      <!--<mt-navbar v-model="prov">-->
      <!--<mt-tab-item :id="'prov'+index" v-for="(item,index) in provList" :key="index">{{item.area}}</mt-tab-item>-->

      <!--</mt-navbar>-->
      <!--<mt-tab-container v-model="prov">-->
      <!--<mt-tab-container-item :id="'prov'+index" v-for="(item,index) in provList" :key="index">-->
      <!--<div class="storeInfo" v-for="(city,idx) in item.stores">-->
      <!--<div class="left">-->
      <!--<h4 class='storeName'>{{city.name}}</h4>-->
      <!--<p class='adress'>{{city.address}}</p>-->
      <!--<p class='map' @click="toMap(city.lon,city.lat)"><span class='iconfont icon-map1'></span>地图</p>-->
      <!--</div>-->
      <!--<div class="right">-->
      <!--<div @click='call(city.telephone)'><span class='iconfont icon-dianhua1'></span></div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</mt-tab-container-item>-->
      <!--</mt-tab-container>-->
      <tab :line-width="1"
           active-color="#e40011"
           custom-bar-width="0.7rem"
           v-model="tabIndex">
        <tab-item class="vux-center" :selected="selected === item.area" v-for="(item, index) in provList"
                  :disabled="true"
                  @click.native="selected = item.area"
                  :key="index">
          {{item.area}}省
        </tab-item>
      </tab>
      <swiper :height="swiperHeight" :show-dots="false" v-model="tabIndex">
        <swiper-item v-for="(item, idx) in provList" :key="idx">
          <div class="tab-swiper vux-center">
            <div class="storeInfo" v-for="(city,idx) in item.stores">
              <div class="left">
                <h4 class='storeName'>{{city.name}}</h4>
                <p class='adress'>{{city.address}}</p>
                <p class='map' @click="toMap(city.lon,city.lat)"><span class='iconfont icon-map1'></span>地图</p>
              </div>
              <div class="right">
                <div @click='call(city.telephone)'><span class='iconfont icon-dianhua1'></span></div>
              </div>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
  import sHeader from '../common/smallHeader'
  import {Tab, TabItem, Swiper, SwiperItem} from 'vux'

  export default {
    name: "store",
    components: {
      sHeader,
      Tab,
      TabItem,
      Swiper,
      SwiperItem
    },
    data() {
      return {
        title: '全国门店',
        selected: '云南',
        tabIndex: 0,
        swiperHeight: "6rem",
        provList: [],
      }
    },
    mounted() {
      this.getAllStore()
    },
    methods: {
      getAllStore: function () {
        let that = this
        let url = that.$com.baseUrl + '/wx/car/getAllStore'
        let lengthList = []
        this.$com.api(url, {}, (res) => {
          that.provList = res.data
          that.selected = that.provList[0].area
          that.provList.forEach((v, i) => {
            lengthList.push(v.stores.length)
          })
          that.swiperHeight = Math.max(...lengthList) + 'rem'
        })
      },
      call: function (no) {
        window.location.href = "tel:" + no;
      },
      toMap: function (lon, lat) {
        window.location.href = 'http://uri.amap.com/marker?position=' + lon + ',' + lat
      }
    }
  }
</script>

<style scoped lang='less'>
  #store {
    .container {
      /*.mint-navbar {*/
        /*border-bottom: 1px solid #e9e9e9;*/
        /*padding: 0 .15rem;*/
        /*.mint-tab-item.is-selected {*/
          /*border-bottom: 1px solid #e40011;*/
          /*color: #e40011;*/
          /*margin-bottom: -1px;*/
          /*.mint-tab-item-label {*/
            /*font-size: .17rem !important;*/
            /*color: #e40011;*/
          /*}*/
        /*}*/
        /*.mint-tab-item-label {*/
          /*font-size: .12rem !important;*/
          /*color: #666666;*/
        /*}*/
      /*}*/
      /*.mint-tab-container-item {*/
        /*padding: 0 .15rem;*/

      /*}*/
     .vux-tab-item{
        font-size: .17rem;
      }
      .tab-swiper.vux-center {

        .storeInfo {
          width: 100%;
          padding: 0 .15rem;

          height: 1rem;
          border-bottom: 1px solid #e9e9e9;
          display: flex;
          justify-content: space-between;
          .left {
            padding-top: .2rem;

            .storeName {
              font-size: .17rem;
              font-weight: normal;
            }
            p {
              font-size: .14rem;
              color: #666666;
              line-height: .23rem;
              .iconfont {
                margin-right: .05rem;
                font-size: .14rem;

              }
            }
          }
          .right {
            height: 100%;
            line-height: 1rem;
            span {
              font-size: .25rem;
            }
          }
        }
      }

    }
  }

</style>
