<template>
  <div id="comFiltrate">
    <div id="menu" class='df'>
      <div class="menu-item" v-for="(item,index) in filter">
        <i @click='openPop($event)' :filter-index="index">{{item.text}}</i>
        <span class='iconfont'
              :class="item.icon"></span>
      </div>
    </div>
    <div class="databox">
      <ul>
        <li v-for="(data,index) in dataList" :key="index">
          <i>{{data.text}}</i> <span class='iconfont icon-delete' @click='deleteData(data)'></span>
        </li>
        <li class='resetdata' @click='resetData()'
            v-show='dataList.length!=0'><span class='iconfont icon-shuaxin'></span> <i>重置</i></li>
      </ul>
    </div>
    <transition name="def">
      <div class="def" v-show="filter[0].active">
        <ul class='def-list' @touchmove="touch($event)">
          <li v-for='(item,index) in defList' v-show="carType==item.carType||carType=='usedcar'">
            <div class="li-item df" :class="{'p-active':item.active}" @click="changeDef($event,item.text)"
                 :d-index="index">
              <i :d-index="index">{{item.text}}</i><span class='iconfont' :class="[item.icon,{'p-active':item.active}]"
                                                         :d-index="index"></span>
            </div>
          </li>
        </ul>
      </div>
    </transition>
    <transition name='brand'>
      <div class="brand" v-show="filter[1].active">
        <header id='brandHeader'>
          <div class="back" @click="closeModel()">
            <span class='iconfont icon-back'></span>
          </div>
          <p>{{bTitle}}</p>
        </header>
        <div class="b-content">
          <mt-index-list>
            <div class="hot-brand">
              <div class="b-title">热门品牌</div>
              <ul class='hot'>
                <li v-for="(item,index) in hotBrandList" :key='index' @click='chooseBrand(item)'>
                  <div class="b-logo">
                    <img :src="item.brand_image" alt="">
                  </div>
                  <p>{{item.brand_name}}</p>
                </li>
              </ul>
            </div>
            <mt-index-section index="*">
              <mt-cell title="不限品牌"></mt-cell>
            </mt-index-section>

            <mt-index-section :index="item.initial" v-for="(item,index) in brandList" :key="index">
              <div v-for="(brand,idx) in item.brandList"
                   :key='idx' class='brandListInfo'
                   @click='showCarSeries($event,brand)'>
                <img :src="brand.brandImage" alt="">
                <mt-cell :title="brand.brandName"></mt-cell>
              </div>
            </mt-index-section>
          </mt-index-list>
          <mt-popup
            v-model="CarSeries"
            position="right"
            class="CarSeries">
            <div class="carBrand">
              <img :src="brandTitle.brandImage" alt="">
              <mt-cell :title="brandTitle.brandName"></mt-cell>
            </div>
            <div class="b-line">选择车系</div>
            <ul>
              <li>
                <mt-cell title="不限车系"></mt-cell>
              </li>
              <li v-for="(item,index) in carSeriesList" :key="index" @click="chooseBrand(item)">
                <mt-cell :title="item.seriesName"></mt-cell>
              </li>
            </ul>
          </mt-popup>
        </div>
      </div>
    </transition>
    <transition name='price'>
      <div class="price" v-show='filter[2].active' @touchmove="touch($event)">
        <div class="custom">
          <p>自定义</p>
          <div class='df'>
            <div class='minPrice'><input type="number" v-model="sendData.minprice">万</div>
            -
            <div class='maxPrice'><input type="number" v-model="sendData.maxprice">万</div>
            <div class="confirm" @click='confirmData("price")'>确定</div>
          </div>

        </div>
        <ul class="price-list">
          <li @click="index==0?deleteData(item):changePrice($event,item)" :p-index="index"
              v-for="(item,index) in priceList"
              :class='{"f-active":item.active}'>{{item.text}}
          </li>
        </ul>
        <!--<div class="option df">-->
        <!--<div class="reset" @click="reset('price')">重置</div>-->
        <!--</div>-->
      </div>
    </transition>
    <transition name='firstPay'>
      <div class="firstPay" v-show='filter[3].active' @touchmove="touch($event)">
        <div class="custom">
          <p>自定义</p>
          <div class='df'>
            <div class='minPrice'><input type="number" v-model="sendData.minfirstPay">万</div>
            -
            <div class='maxPrice'><input type="number" v-model="sendData.maxfirstPay">万</div>
            <div class="confirm" @click='confirmData("firstPay")'>确定</div>
          </div>
        </div>
        <ul class="price-list">
          <li @click="index==0?deleteData(item):changeFirstPay($event,item)" :fp-index="index"
              v-for="(item,index) in firstPayList"
              :class='{"f-active":item.active}'>{{item.text}}
          </li>
          <li style='opacity: 0;'></li>
        </ul>
        <!--<div class="option df">-->
        <!--<div class="reset" @click="reset('firstPay')">重置</div>-->
        <!--</div>-->
      </div>
    </transition>
    <transition name='monthPay'>
      <div class="monthPay" v-show='filter[4].active' @touchmove="touch($event)">
        <div class="custom">
          <p>自定义</p>
          <div class='df'>
            <div class='minPrice'><input type="number" v-model="sendData.minmonthPay">元</div>
            -
            <div class='maxPrice'><input type="number" v-model="sendData.maxmonthPay">元</div>
            <div class="confirm" @click='confirmData("monthPay")'>确定</div>
          </div>
        </div>
        <ul class="price-list">
          <li @click="index==0?deleteData(item):changeMonthPay($event,item)" :mp-index="index"
              v-for="(item,index) in monthPayList"
              :class='{"f-active":item.active}'>{{item.text}}
          </li>
        </ul>
        <!--<div class="option df">-->
        <!--<div class="reset" @click="reset('monthPay')">重置</div>-->
        <!--</div>-->
      </div>
    </transition>
    <transition name='filtrate'>
      <div class="filtrate" v-show="filter[5].active">
        <header>
          <div class="back" @click="closeModel()">
            <span class='iconfont icon-back'></span>
          </div>
          <p>高级筛选</p>
        </header>
        <div class="f-content">
          <div class="f-carType">
            <div class="f-title">车型</div>
            <ul class="f-info">
              <li class="infoList"
                  v-for="(item,index) in carTypeList"
                  :key='index'
                  :class='{"f-active":item.active}'
                  @click="filtrateClick(item,index)">
                <div class='imgbox'></div>
                <p>{{item.text}}</p>
              </li>
              <li class="infoList" style='opacity: 0'></li>
            </ul>
          </div>
          <div class="f-carAge">
            <div class="f-title">车龄</div>
            <ul class="f-info">
              <li class="infoList"
                  :class='{"f-active":item.active}'
                  v-for="(item,index) in carYearList"
                  :key="index"
                  @click="filtrateClick(item,index)">{{item.text}}
              </li>
              <li class="infoList" style='opacity: 0'></li>
            </ul>
          </div>
          <div class="f-carMile">
            <div class="f-title">里程</div>
            <ul class="f-info">
              <li class="infoList" v-for="(item,index) in carMileList" :key="index" :class='{"f-active":item.active}'
                  @click="filtrateClick(item,index)">{{item.text}}
              </li>
              <li class="infoList" style='opacity: 0'></li>
            </ul>
          </div>
          <div class="f-carDpm">
            <div class="f-title">排量</div>
            <ul class="f-info">
              <li class="infoList" v-for="(item,index) in carDpmList" :key="index" :class='{"f-active":item.active}'
                  @click="filtrateClick(item,index)">{{item.text}}
              </li>
              <li class="infoList" style='opacity: 0'></li>
            </ul>
          </div>
          <div class="f-carGearBox">
            <div class="f-title">变速箱</div>
            <ul class="f-info">
              <li class="infoList" v-for="(item,index) in carGearBoxList" :key="index" :class='{"f-active":item.active}'
                  @click="filtrateClick(item,index)">{{item.text}}
              </li>

              <li class="infoList" style='opacity: 0'></li>
            </ul>
          </div>

        </div>
        <footer>
          <div class="reset" @click='fReset()'>重置</div>
          <div class="see" @click='fComfirm()'>查看已找到的{{carTotal}}辆车</div>
        </footer>
      </div>
    </transition>
    <div class="p-model" v-show="popup" @click='closeModel()' @touchmove="touch($event)"></div>
  </div>
</template>

<script>
  import {IndexList, IndexSection, Toast} from 'mint-ui';
  import sHeader from './smallHeader'
  import {mapState, mapMutations} from 'vuex'
  import Bus from '../common/bus'

  export default {
    name: "comFiltrate",
    components: {
      sHeader
    },
    props: ['carType'],
    watch: {
      'popup': function (val) {
        if (val == true) {
          document.getElementsByTagName('html')[0].className = 'no-scroll'
          document.getElementsByClassName('mint-indexlist-content')[0].style.height = 6.177 + 'rem'
        } else {
          document.getElementsByTagName('html')[0].className = ''
          this.filter.forEach((v, i) => {
            v.icon = "icon-down"
          })
        }
      },
    },
    data() {
      return {

        popup: false,
        bTitle: '选择品牌车型',
        CarSeries: false,
        brandTitle: {},
        carTotal: '0'
      }
    },
    computed: {
      ...mapState({
        filter: state => state.filterData.filter,
        defList: state => state.filterData.defList,
        priceList: state => state.filterData.priceList,
        firstPayList: state => state.filterData.firstPayList,
        monthPayList: state => state.filterData.monthPayList,
        carTypeList: state => state.filterData.carTypeList,
        carYearList: state => state.filterData.carYearList,
        carMileList: state => state.filterData.carMileList,
        carDpmList: state => state.filterData.carDpmList,
        carGearBoxList: state => state.filterData.carGearBoxList,
        // hotBrandList: state => state.filter.hotBrandList,
        newcarData: state => state.newcarData,
        usedcarData: state => state.usedcarData,
        dataList: state => state.dataList,
        sendData: state => state.sendData,
        filtrateList: state => state.filtrateList,
        brandList: state => state.brandList,
        carSeriesList: state => state.carSeriesList,
        hotBrandList: state => state.hotBrandList,
      })
    },
    mounted() {
      this.getBrandInfo()
      this.getHotBrand()
    },
    methods: {
      ...mapMutations(['changeCarType', 'filtrateReset']),
      openPop: function (event) {
        let idx = event.target.getAttribute("filter-index")
        if (this.filter[idx].text == '筛选') {
          this.getTotal()
        }


        if (this.filter[idx].active) {
          this.closeActive(this.filter)
          this.filter[idx].icon = 'icon-down';
          this.popup = false;
        } else {
          this.closeActive(this.filter)
          this.filter[idx].active = true;
          this.filter.forEach((v, i) => {
            v.icon = 'icon-down'
          })
          this.filter[idx].icon = 'icon-up';
          this.popup = true;
        }

        // Bus.$emit('msg', this.popup)
      },
      closeModel: function () {
        this.closeActive(this.filter)
        this.popup = false
      },
      changeDef: function (event, name) {
        let idx = event.target.getAttribute("d-index")
        this.closeActive(this.defList)
        this.defList[idx].active = true
        this.$store.commit('changeDef', this.defList[idx].value)
        Bus.$emit('changedDef', name)
        this.filter[0].text = name
        this.closeModel()
      },
      changePrice: function (event, item) {
        let idx = event.target.getAttribute("p-index")
        this.closeActive(this.priceList)
        this.priceList[idx].active = true
        this.$store.commit('addData', item)
        this.closeModel()
      },
      changeFirstPay: function (event, item) {
        let idx = event.target.getAttribute("fp-index")
        this.closeActive(this.firstPayList)
        this.firstPayList[idx].active = true
        this.$store.commit('addData', item)
        this.closeModel()
      },
      changeMonthPay: function (event, item) {
        let idx = event.target.getAttribute("mp-index")
        this.closeActive(this.monthPayList)
        this.monthPayList[idx].active = true
        this.$store.commit('addData', item)
        this.closeModel()
      },
      reset: function (data) {
        let list = data + 'List'
        let min = 'min' + data
        let max = 'max' + data
        this.closeActive(this[list])
        this[list][0].active = true
        this.sendData[min] = ''
        this.sendData[max] = ''
        if (this.dataList.length > 0) {
          this.dataList.forEach((v, i) => {
            if (v.type == data) {
              this.dataList.splice(i, 1)
            }
          })
        }
        this.closeModel()
      },
      getHotBrand: function () {
        let url = this.$com.baseUrl + '/car/basic/getHotBrand'
        let that = this
        this.$com.api(url, {}, (res) => {
          if (res.res_code == '0000') {
            that.$store.commit('getHotBrand', res.data)
          } else {
            console.log('出错了');
          }
        })
      },
      getBrandInfo: function () {
        let url = this.$com.baseUrl + '/wx/car/getCarBrandList';
        let that = this
        this.$com.api(url, {}, (res) => {
          if (res.res_code == '0000') {
            // this.brandList = res.data
            that.$store.commit('getBrand', res.data)
            // console.log(this.brandList);
          } else {
            console.log('出错了');
          }
        })
      },
      showCarSeries: function (event, obj) {
        this.brandTitle = obj
        this.CarSeries = true
        let url = this.$com.baseUrl + '/wx/car/countBySeries'
        let that = this
        this.$com.api(url, {'carBrandId': obj.carBrandId}, (res) => {
          if (res.res_code == '0000') {
            that.$store.commit('getCarSeries', res.data)
          } else {
            console.log('出错了');
          }
        })
      },
      chooseBrand: function (item) {
        let obj = {}
        if (item.seriesName) {
          obj.value = item.carSeriesId
          obj.text = item.seriesName
          obj.isSeries = '1'
        } else {
          obj.value = item.car_brand_id
          obj.text = item.brand_name
        }
        obj.type = 'brand'
        this.$store.commit('addData', obj)
        // console.log(obj);
        this.CarSeries = false
        this.closeModel()
      },
      closeActive: function (data) {
        for (var i = 0; i < data.length; i++) {
          data[i].active = false;
        }
      },
      deleteData: function (data) {
        this.$store.commit('deleteData', data)
        this.closeModel()
      },
      confirmData: function (str) {
        let min = 'min' + str
        let max = 'max' + str
        let list = str + 'List'
        let unit = ''
        str == 'monthPay' ? unit = '元' : unit = '万'
        if (!this.sendData[max] && !this.sendData[min]) {
          Toast({
            message: '请输入正确的价格区间',
            position: 'bottom',
            duration: 2000
          });
          return;
        }
        let obj = {}
        obj.min = this.sendData[min]
        obj.max = this.sendData[max]
        obj.type = str
        if (!this.sendData[max]) {
          obj.text = this.sendData[min] + unit + '以上'
        } else if (!this.sendData[min]) {
          obj.text = this.sendData[max] + unit + '以内'

        } else {
          obj.text = this.sendData[min] + '-' + this.sendData[max] + unit
        }
        this.$store.commit('addData', obj)

        this.closeModel()
        this[list].forEach((v, i) => {
          v.active = false
        })
      },
      touch: function (event) {
        if (this.popup) {
          event.preventDefault()
        }
      },
      resetData: function () {
        this.$store.commit('resetData')
      },
      filtrateClick: function (item, index) {
        this.$store.commit('changeCarType', {item, index})
        this.getTotal(item)
      },
      fReset: function () {
        this.$store.commit('filtrateReset')
        this.getTotal()
      },
      fComfirm: function () {
        this.filtrateList.forEach((v, i) => {
          this[v].forEach((val, idx) => {
            if (val.active == true) {
              this.$store.commit('addData', val)
            }
          })
        })
        this.closeModel()
      },
      getTotal: function (item) {
        let url = this.$com.baseUrl + '/wx/car/getCarLists'
        let that = this
        this.usedcarData.isNewCar = ''
        if (item) {
          switch (item.type) {
            case 'carType':
              this.usedcarData.classify = item.value
              break;
            case 'carYear':
              this.usedcarData.carAge = item.value
              break;
            case 'carMile':
              this.usedcarData.mile = item.value
              break;
            case 'carDpm':
              this.usedcarData.displacement = item.value
              break;
            case 'carGearBox':
              this.usedcarData.gearbox = item.value
              break;
          }
        }
        this.$com.api(url, this.usedcarData, (res) => {
          if (res.res_code == '0000') {
            that.carTotal = res.data.total
          }
        })
      }

    },
  }
</script>

<style scoped lang='less'>
  #comFiltrate {

    position: relative;
    /*height: .54rem;*/
    /*margin-top: .4rem;*/
    .databox {
      width: 100%;
      padding: 0 .15rem;
      background-color: #f5f5f5;
      ul {
        display: flex;
        flex-flow: row wrap;
        li {
          padding: 0 .09rem;
          border: 1px solid #e9e9e9;
          line-height: .27rem;
          background-color: #ffffff;
          color: #666666;
          margin-right: .15rem;
          margin-bottom: .07rem;
          margin-top: .07rem;
          border-radius: .05rem;

          i, .iconfont {
            font-size: .12rem;
          }
        }
        .resetdata {
          border: none;
          background-color: transparent;
          margin-right: 0;
          padding: 0;
        }
      }
    }
    #menu {
      justify-content: space-between;
      padding: .18rem .15rem .15rem;
      border-bottom: 1px solid #e9e9e9;
      .menu-item {
        display: flex;
        flex-flow: row nowrap;
        text-align: center;
        line-height: .2rem;
        i {
          font-size: .13rem;
        }
        .iconfont {
          font-size: .13rem;
        }
        .icon-up {
          color: #e40011;
        }
      }
    }
    .def, .price, .firstPay, .monthPay {
      position: absolute;
      width: 100%;
      /*height: 3.64rem;*/
      background-color: #ffffff;
      left: 0;
      top: .54rem;
      z-index: 2144;
      padding: 0 0.15rem;

      .def-list {
        li {
          border-bottom: 1px solid #e9e9e9;
          height: .52rem;
          line-height: .52rem;
          &:last-child {
            border: none;
          }
          .li-item {
            justify-content: space-between;
            span {
              color: #fff;
              &.p-active {
                color: #e40011;
              }
            }
            &.p-active {
              color: #e40011;
            }
          }
        }
      }
    }
    .price, .firstPay, .monthPay {
      .custom {
        border-bottom: 1px solid #e9e9e9;

        p {
          line-height: .5rem;
          font-size: .15rem;
        }
        > div {
          line-height: .37rem;
          margin-bottom: .3rem;
          .confirm {
            background-color: #e40011;
            color: #ffffff;
            text-align: center;
            height: .37rem;
            line-height: .37rem;
            width: .6rem;
            -webkit-border-radius: .04rem;
            -moz-border-radius: .04rem;
            border-radius: .04rem;
            margin-left: .58rem;
          }
        }
        .minPrice, .maxPrice {
          display: flex;
          flex-flow: row nowrap;
          height: .37rem;
          line-height: .37rem;
          width: 1.09rem;
          background-color: #f5f5f5;
          -webkit-border-radius: .04rem;
          -moz-border-radius: .04rem;
          border-radius: .04rem;
          padding-right: .1rem;

          input {
            border: none;
            outline: none;
            width: 100%;
            height: 100%;
            background-color: #f5f5f5;
            padding-left: .1rem;
            font-size: .14rem;
          }
        }
      }
      .price-list {
        padding: .27rem 0;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        border-bottom: 1px solid #e9e9e9;
        li {
          width: 1.09rem;
          height: .37rem;
          line-height: .37rem;
          text-align: center;
          -webkit-border-radius: .04rem;
          -moz-border-radius: .04rem;
          border-radius: .04rem;
          background-color: #f5f5f5;
          margin-bottom: .13rem;
          &:nth-of-type(n+6) {
            margin-bottom: 0;
          }
        }
        .f-active {
          border: 1px solid #e40011;
          color: #e40011;
          background-color: #ffffff;
        }
      }
      .option {
        padding-top: .25rem;
        padding-bottom: .29rem;
        justify-content: space-between;
        .reset, .confirm {
          width: 1.65rem;
          height: .4rem;
          background-color: #f5f5f5;
          line-height: .4rem;
          text-align: center;
          -webkit-border-radius: .04rem;
          -moz-border-radius: .04rem;
          border-radius: .04rem;
        }
        .confirm {
          background-color: #e40011;
          color: #ffffff;
        }
      }
    }
    .brand, .filtrate {
      width: 100%;
      height: 100%;

      background-color: #ffffff;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2045;
      header {
        width: 100%;
        height: .5rem;
        border-bottom: 1px solid #e9e9e9;
        padding: 0 .15rem;
        display: flex;
        line-height: .5rem;
        background-color: #ffffff;
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
      .b-content {
        .hot-brand {
          padding: 0 .15rem;
          .b-title {
            margin: .2rem 0;
          }
          .hot {
            display: flex;
            flex-flow: row wrap;
            li {
              width: 20%;
              margin-bottom: .2rem;
              .b-logo {
                width: .34rem;
                height: .34rem;
                margin: 0 auto;
                img {
                  width: 100%;
                }
              }
              p {
                /*margin-top: .15rem;*/
                text-align: center;
              }
            }
          }
        }
        .brandListInfo {
          display: flex;
          img {
            min-width: .34rem;
            height: .34rem;
            margin: auto 0;
            margin-right: .1rem;
          }
        }
      }
    }
    .filtrate {

      .f-content {
        overflow: scroll;
        height: 6.17rem;
        padding: 0 .15rem;
        padding-bottom: .5rem;
        > div:last-child {
          border: 0;
        }
        .f-title {
          line-height: .57rem;
          font-size: .15rem;
          color: #000000;
        }
        .f-active {
          border: 1px solid #e40011;
        }
        .f-carType {
          border-bottom: 1px solid #e9e9e9;
          padding-bottom: .2rem;
          .f-info {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            .infoList {
              width: 1.02rem;
              height: .65rem;
              border-radius: 4px;
              padding-top: .05rem;
              margin-bottom: .1rem;
              /*border: 1px solid #e40011;*/
              /*img {*/
              /*width: .85rem;*/
              /*margin: 0 auto;*/
              /*display: block;*/
              /*}*/
              &:nth-of-type(2) .imgbox {
                background-image: url('../../assets/images/other/liangxiang.png');
              }
              &:nth-of-type(3) .imgbox {
                background-image: url('../../assets/images/other/sanxiang.png');
              }
              &:nth-of-type(4) .imgbox {
                background-image: url('../../assets/images/other/car@2x.png');
              }
              &:nth-of-type(5) .imgbox {
                background-image: url('../../assets/images/other/suv.png');
              }
              &:nth-of-type(6) .imgbox {
                background-image: url('../../assets/images/other/mpv.png');
              }
              &:nth-of-type(7) .imgbox {
                background-image: url('../../assets/images/other/mianbao.png');
              }
              &:nth-of-type(8) .imgbox {
                background-image: url('../../assets/images/other/pika.png');
              }
              .imgbox {
                width: .75rem;
                margin: 0 auto;
                height: .3rem;
                background-image: url('../../assets/images/other/buxian.png');
                background-repeat: no-repeat;
                -webkit-background-size: .75rem .3rem;
                background-size: .75rem .3rem;

              }
              p {
                text-align: center;
              }
            }
          }
        }
        .f-carAge, .f-carMile, .f-carDpm, .f-carGearBox {
          border-bottom: 1px solid #e9e9e9;
          padding-bottom: .2rem;
          .f-info {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            .infoList {
              width: 1.02rem;
              height: .35rem;
              line-height: .35rem;
              text-align: center;
              border: 1px solid #e9e9e9;
              margin-bottom: .16rem;
              &.f-active {
                border: 1px solid #e40011;
              }
            }
          }
        }
      }
      footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: .5rem;
        line-height: .5rem;
        text-align: center;
        background-color: #fff;
        display: flex;
        .reset {
          min-width: 1.17rem;
          height: 100%;
          border-top: 1px solid #e9e9e9;
          color: #e40011;
        }
        .see {
          width: 100%;
          height: 100%;
          background-color: #e40011;
          border-top: 1px solid #e40011;

          color: #ffffff;
        }
      }
    }
    .p-model {
      position: fixed;
      width: 100%;
      height: 100%;
      background-color: #000;
      left: 0;
      top: .96rem;
      opacity: 0.5;
      z-index: 144;
    }
    .CarSeries {
      width: 60%;
      height: 100%;
      z-index: 2094;
      .carBrand {
        display: flex;
        padding-left: .15rem;
        img {
          min-width: .34rem;
          height: .34rem;
          margin: auto 0;
          margin-right: .1rem;
        }
      }
      .b-line {
        height: .24rem;
        line-height: .24rem;
        background-color: #f5f5f5;
        font-size: .12rem;
        padding-left: .15rem;
      }
      ul {
        padding-left: .15rem;
        li {
          border-bottom: 1px solid #e9e9e9;
        }
      }
    }
    .def-enter-active, .price-enter-active, .firstPay-enter-active, .monthPay-enter-active {
      animation: pop-in 0.2s ease;
      transform-origin: top center;
    }
    .def-leave-active, .price-leave-active, .firstPay-leave-active, .monthPay-leave-active {
      animation: pop-out 0.2s ease;
      transform-origin: top center;
    }
  }

  @keyframes pop-in {
    from {
      transform: scaleY(0);
    }
    to {
      transform: scaleY(1)
    }
  }

  @keyframes pop-out {
    from {
      transform: scaleY(1);
    }
    to {
      transform: scaleY(0);
    }
  }
</style>
