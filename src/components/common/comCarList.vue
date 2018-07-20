<template>
  <div id="comCarList" :class="{pb:edits}">
    <mt-navbar v-model="selected" v-show='!edits'>
      <mt-tab-item id="newcar">新车</mt-tab-item>
      <mt-tab-item id="usedcar">二手车</mt-tab-item>
    </mt-navbar>
    <div class="isEdits" v-show='edits'>
      {{selected=='newcar'?'新车':'二手车'}}
    </div>
    <!-- tab-container -->
    <!--<div :style="{'-webkit-overflow-scrolling': scrollMode}">-->
    <mt-loadmore :bottom-method="loadBottom" ref="loadmore">
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="newcar">
          <div class="carCell" v-for='(item,index) in newcarList' :key='index'>
            <div class="edit" v-show='edits'>
              <!--<input type="checkbox" @change='changeIpt($event)' :car-value="item.value" v-model="item.edits">-->
              <input type='checkbox' :id="'newCar'+index"
                     @change='changeIpt($event,item)'>
              <label :for="'newCar'+index"
                     :car-value="item.value"
              ></label>
            </div>
            <router-link class="carInfo" :to="'/car/detail/'+item.carDetailId">
              <div class="img">
                <img :src="item.image" alt="">
              </div>
              <div class="text">
                <div class="title">{{item.modelName}}</div>
                <div class="factoryPirce">厂商指导价: <span>{{item.modelPrice}}</span>万</div>
                <div class="pirce">
                  <div class="firstPay">首付<i>{{item.firstPay}}</i>万</div>
                  <div class="monthPay">月供<i>{{item.monthRepay}}</i>元</div>
                </div>
              </div>
            </router-link>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="usedcar">
          <div class="carCell" v-for='(item,index) in usedcarList' :key='index'>
            <div class="edit" v-show='edits'>
              <input type='checkbox' :id="'usedCar'+index"
                     @change='changeIpt(item)'>
              <label :for="'usedCar'+index"
                     :car-value="item.value"
              ></label>
            </div>
            <router-link class="carInfo" :to="'/car/detail/'+item.carDetailId">
              <div class="img">
                <img :src="item.image" alt="">
              </div>
              <div class="text">
                <div class="title">{{item.modelName}}</div>
                <div class="carInfo">
                  <i>{{item.cityName}}</i>&nbsp;|&nbsp;<i>{{(item.plateTime).substr(0,4)}}</i>年&nbsp;|&nbsp;<i>{{item.mile}}</i>万公里
                </div>
                <div class="pirce">
                  <div class="salePirce"><i>{{item.priceStr}}</i>万</div>
                  <div class="oriPirce"><i>{{item.modelPrice}}</i>万</div>
                </div>
              </div>
            </router-link>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </mt-loadmore>
    <!--</div>-->
    <div class="editFooter df" :class="{show:!edits}">
      <div class="ipt">
        <input type='checkbox' id="allIpt" @change='chooseAll($event)'><label for="allIpt" v-model="allIpt">全选</label>
      </div>
      <div class="delete" @click.natve='deleteCollect()'>删除</div>
    </div>
  </div>
</template>

<script>
  import Bus from './bus'
  import {mapGetters, mapState} from 'vuex';
  import {Toast} from 'mint-ui';

  export default {
    name: "comCarList",

    props: ['edits', 'isCollect'],
    data() {
      return {
        selected: 'newcar',
        allIpt: false,
        popup: false,
        newcarList: [],
        usedcarList: [],
        newcarTotal: '',
        usedcarTotal: '',
        scrollMode: "auto",
        allLoaded: false,
        newcarCollect: {
          userId: localStorage.getItem('jshc_id'),
          isNewCar: '1',
          page: '1',
          size: '5'
        },
        usedcarCollect: {
          userId: localStorage.getItem('jshc_id'),
          isNewCar: '0',
          page: '1',
          size: '5'
        }
      }
    },
    // computed: {
    //   ...mapState({
    //     newCarData: state => state.newCarData,
    //     usedCarData: state => state.usedCarData,
    //   }),
    // },
    computed: {
      ...mapState(['newcarData', 'usedcarData']),
      ...mapGetters(['getDataList'])
    },
    mounted() {
      if (this.$route.params.type) {
        this.selected = this.$route.params.type
      }
      // console.log(this.isCollect);
      if (this.isCollect) {
        this.getCollectList()
      } else {
        this.getNewCarList()
        this.getUsedCarList()
      }


    },
    created() {
      Bus.$on('sendCityName', (data, id) => {
        this.getNewCarList()
        this.getUsedCarList()
      })
      Bus.$on('changedDef', (name) => {
        // console.log('name=' + name);
        this.getNewCarList()
        this.getUsedCarList()
      })
    },
    watch: {
      'selected': function (val) {
        this.$emit('listenTochildEvent', val)
      },
      'getDataList': {
        handler(val, oldVal) {
          console.log('数据改变了');
          this.getNewCarList()
          this.getUsedCarList()
        },
        deep: true
      },
      'edits': function (val) {
        console.log(val);
        // if (val) {
        //   this.selected = 'newcar'
        // }
      }
    },
    methods: {
      seeCarInfo: function () {
        console.log(this.$store.state.newCarData);
      },
      changeIpt(event, item) {
        console.log(item);
        console.log(event.target.checked);


      },
      chooseAll: function (ev) {
        let list = this.selected + 'List'
        // this[list].forEach(function (v, i) {
        //   v.edits = ev.target.checked
        // })
        console.log(this[list]);
      },
      deleteCollect: function () {
        alert('删除全部!')
      },
      getNewCarList: function () {
        let that = this
        let url = this.$com.baseUrl + '/wx/car/getCarLists'
        this.$com.api(url, this.newcarData, (res) => {
          // console.log(res);
          if (res.res_code == '0000') {
            that.newcarList = res.data.rows
            that.newcarTotal = res.data.total
          }
        })
      },
      getUsedCarList: function () {
        let that = this
        let url = this.$com.baseUrl + '/wx/car/getCarLists'
        this.$com.api(url, this.usedcarData, (res) => {
          // console.log(res);
          if (res.res_code == '0000') {
            that.usedcarList = res.data.rows
            that.usedcarTotal = res.data.total
            // console.log(that.usedcarList);
            // console.log(that.usedcarTotal);
          }
        })
      },
      loadBottom: function () {
        let total = this.selected + 'Total'
        let data = this.selected + 'Data'
        if (this.isCollect) {
          data = this.selected + 'Collect'
        }
        // console.log(this[total]);
        if (this[data].page * this[data].size < this[total]) {

          if (this.isCollect) {

          } else {
            console.log(this[data].size);
            this[data].size = parseInt(this[data].size) + 5

            // this.$store.commit('changeSize', data)
          }
          this.loadMoreData(this.selected)

        } else {
          this.allLoaded = true
          Toast({
            message: '没有更多车辆了',
            position: 'bottom',
            duration: 2000
          });
        }
        this.$refs.loadmore.onBottomLoaded();
      },
      loadMoreData: function (type) {
        let data = type + 'Data'
        let List = type + 'List'
        let total = type + 'Total'
        let that = this
        console.log(this);
        let url = that.$com.baseUrl + '/wx/car/getCarLists'
        this.$com.api(url, this[data], (res) => {
          if (res.res_code == '0000') {
            that[List] = res.data.rows
            that[total] = res.data.total
          }
        })

      },
      getCollectList: function () {
        let that = this
        let url = this.$com.baseUrl + '/wx/car/getMyCollection'
        this.$com.api(url, this.newcarCollect, (res) => {
          if (res.res_code == '0000') {
            that.newcarList = res.data.rows
            that.newcarTotal = res.data.total
          }
        })
        this.$com.api(url, this.usedcarCollect, (res) => {
          console.log(res);
          if (res.res_code == '0000') {
            that.usedcarList = res.data.rows
            that.usedcarTotal = res.data.total
          }
        })
      }
    }
  }
</script>

<style scoped lang='less'>
  #comCarList {
    &.pb {
      padding-bottom: .5rem;
    }
    .isEdits {
      width: 100%;
      height: .5rem;
      line-height: .5rem;
      text-align: center;
      border-bottom: 1px solid #e9e9e9;
      font-size: .16rem;
      color: #e40011;
    }
    .mint-navbar {
      justify-content: space-evenly;
      border-bottom: 1px solid #e9e9e9;
      .mint-tab-item {
        width: .85rem;
        max-width: .85rem;
        > .mint-tab-item-label {
          font-size: .16rem;
        }
        &.is-selected {
          border-bottom: 1px solid #e40011;
          color: #e40011;
          margin-bottom: -1px;
        }
      }
    }
    .mint-tab-container-item {
      padding: 0 .15rem;
      .carCell {
        width: 100%;
        border-bottom: 1px solid #e9e9e9;
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
    .editFooter {
      width: 100%;
      height: .5rem;
      border-top: 1px solid #ddd;
      position: fixed;
      left: 0;
      bottom: 0;
      background-color: #ffffff;
      z-index: 1444;
      justify-content: space-between;
      padding-right: .15rem;
      .ipt {
        position: relative;
        width: .5rem;
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
          width: .5rem;
          font-size: .15rem;
          position: absolute;
          left: .45rem;
          top: .25rem;
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
      .delete {
        width: 1.05rem;
        height: .3rem;
        margin-top: .1rem;
        border: 1px solid #e40011;
        color: #e40011;
        line-height: .3rem;
        border-radius: .3rem;
        text-align: center;
      }
    }
    .show {
      display: none;
    }

  }
</style>
