<template>
  <div id="order">

    <header>
      <div class="back" @click="back()">
        <span class='iconfont icon-back'></span>
      </div>
      <p>{{title}}</p>
      <div class="search" @click="openModel()">
        <span class='iconfont icon-search1'></span>
      </div>

    </header>
    <div class="searchTop" v-show='isSearch'>
      <span class='iconfont icon-search'></span>
      <input type="text" placeholder="车辆名称、订单号" v-model="searchVal">
      <p @click="closeModel()">取消</p>
    </div>

    <div class="navBar">
      <mt-navbar v-model="navbar">
        <mt-tab-item id="all"><i>全部订单</i></mt-tab-item>
        <mt-tab-item id="see"><i>预约看车</i></mt-tab-item>
        <mt-tab-item id="audits"><i>订单审核</i></mt-tab-item>
        <mt-tab-item id="contract"><i>合同签订</i></mt-tab-item>
        <mt-tab-item id="success"><i>交易成功</i></mt-tab-item>
      </mt-navbar>
      <div class="bb"></div>
      <mt-tab-container v-model="navbar">
        <mt-tab-container-item id="all">
          <div class="orderCarInfo" v-for="(item,index) in allOrderList" :key="index">
            <div class="state df">
              <div class="orderNo">订单编号: <i>{{item.applyId}}</i></div>
              <div class="orderState">订单状态: <i>{{item.state}}</i></div>
            </div>
            <router-link class="carCell" :to="'/user/order/info'">
              <div class="img">
                <img :src="item.seriesImage" alt="">
              </div>
              <div class="text">
                <div class="title">{{item.modelName}}</div>
                <div class="factoryPirce">厂商指导价: <span>{{item.price}}</span>万</div>
                <div class="pirce">
                  <div class="firstPay">首付<i>{{item.firstPay}}</i>万</div>
                  <div class="monthPay">月供<i>{{Math.ceil(item.monthRepay)}}</i>元</div>
                </div>
              </div>
            </router-link>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="see">
          <div class="orderCarInfo" v-for="(item,index) in seeOrderList" :key="index">
            <div class="state df">
              <div class="orderNo">订单编号: <i>{{item.applyId}}</i></div>
              <div class="orderState">订单状态: <i>{{item.state}}</i></div>
            </div>
            <router-link class="carCell" :to="'/user/order/info'">
              <div class="img">
                <img :src="item.seriesImage" alt="">
              </div>
              <div class="text">
                <div class="title">{{item.modelName}}</div>
                <div class="factoryPirce">厂商指导价: <span>{{item.price}}</span>万</div>
                <div class="pirce">
                  <div class="firstPay">首付<i>{{item.firstPay}}</i>万</div>
                  <div class="monthPay">月供<i>{{Math.ceil(item.monthRepay)}}</i>元</div>
                </div>
              </div>
            </router-link>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="audits">
          <div class="orderCarInfo" v-for="(item,index) in auditsOrderList" :key="index">
            <div class="state df">
              <div class="orderNo">订单编号: <i>{{item.applyId}}</i></div>
              <div class="orderState">订单状态: <i>{{item.state}}</i></div>
            </div>
            <router-link class="carCell" :to="'/user/order/info'">
              <div class="img">
                <img :src="item.seriesImage" alt="">
              </div>
              <div class="text">
                <div class="title">{{item.modelName}}</div>
                <div class="factoryPirce">厂商指导价: <span>{{item.price}}</span>万</div>
                <div class="pirce">
                  <div class="firstPay">首付<i>{{item.firstPay}}</i>万</div>
                  <div class="monthPay">月供<i>{{Math.ceil(item.monthRepay)}}</i>元</div>
                </div>
              </div>
            </router-link>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="contract">
          <div class="orderCarInfo" v-for="(item,index) in contractOrderList" :key="index">
            <div class="state df">
              <div class="orderNo">订单编号: <i>{{item.applyId}}</i></div>
              <div class="orderState">订单状态: <i>{{item.state}}</i></div>
            </div>
            <router-link class="carCell" :to="'/user/order/info'">
              <div class="img">
                <img :src="item.seriesImage" alt="">
              </div>
              <div class="text">
                <div class="title">{{item.modelName}}</div>
                <div class="factoryPirce">厂商指导价: <span>{{item.price}}</span>万</div>
                <div class="pirce">
                  <div class="firstPay">首付<i>{{item.firstPay}}</i>万</div>
                  <div class="monthPay">月供<i>{{Math.ceil(item.monthRepay)}}</i>元</div>
                </div>
              </div>
            </router-link>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="success">
          <div class="orderCarInfo" v-for="(item,index) in successOrderList" :key="index">
            <div class="state df">
              <div class="orderNo">订单编号: <i>{{item.applyId}}</i></div>
              <div class="orderState">订单状态: <i>{{item.state}}</i></div>
            </div>
            <router-link class="carCell" :to="'/user/order/info'">
              <div class="img">
                <img :src="item.seriesImage" alt="">
              </div>
              <div class="text">
                <div class="title">{{item.modelName}}</div>
                <div class="factoryPirce">厂商指导价: <span>{{item.price}}</span>万</div>
                <div class="pirce">
                  <div class="firstPay">首付<i>{{item.firstPay}}</i>万</div>
                  <div class="monthPay">月供<i>{{Math.ceil(item.monthRepay)}}</i>元</div>
                </div>
              </div>
            </router-link>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div class="s-model" v-show='isSearch' @click='closeModel()'></div>

  </div>
</template>

<script>
  import sHeader from '../../common/smallHeader'

  export default {
    name: "order",
    components: {
      sHeader,
    },
    watch: {
      'isSearch': function (val) {
        if (val == true) {
          document.getElementsByTagName('html')[0].className = 'no-scroll'
        } else {
          document.getElementsByTagName('html')[0].className = ''
        }
      }
    },
    data() {
      return {
        title: '我的订单',
        navbar: 'all',
        searchVal: '',
        isSearch: false,
        allOrderList: [],
        seeOrderList: [],
        auditsOrderList: [],
        contractOrderList: [],
        successOrderList: [],
      }
    },
    mounted() {
      this.getOrderList()
    },
    methods: {
      back: function () {
        this.$router.go(-1)
      },
      openModel: function () {
        this.isSearch = true
      },
      closeModel: function () {
        this.isSearch = false
      },
      getOrderList: function () {
        let that = this
        let url = this.$com.baseUrl + '/wx/car/getMyOrder'
        let data = {
          'page': '1',
          'pageSize': '20',
          'phone': localStorage.getItem('jshc_userName')
        }
        this.$com.api(url, data, (res) => {
          if (res.res_code == '0000') {
            that.allOrderList = res.data.rows
            that.allOrderList.forEach((v, i) => {
              switch (v.state) {
                case '0':
                  v.state = '预约看车'
                  that.seeOrderList.push(v)
                  break;
                case '8':
                  v.state = '交易完成'
                  that.successOrderList.push(v)
                  break;
              }
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang='less'>
  #order {
    header {
      width: 100%;
      height: .5rem;
      border-bottom: 1px solid #e9e9e9;
      padding: 0 .15rem;
      display: flex;
      line-height: .5rem;
      background-color: #ffffff;
      .back, .search {
        min-width: .5rem;
        width: .5rem;
        height: 100%;
      }
      .search {
        text-align: right;
      }
      p {
        width: 100%;
        text-align: center;
        font-size: .16rem;
      }
    }
    .searchTop {
      width: 100%;
      height: .5rem;
      border-bottom: 1px solid #e9e9e9;
      padding: 0 .15rem;
      display: flex;
      line-height: .5rem;
      background-color: #ffffff;
      position: fixed;
      left: 0;
      top: 0;
      display: flex;
      justify-content: space-between;
      .icon-search {
        position: absolute;
        left: .2rem;
        color: #cccccc;
        top: 0;
      }
      input {
        width: 3.05rem;
        height: .33rem;
        margin-top: .085rem;
        background-color: #f5f5f5;
        border: none;
        outline: none;
        -webkit-border-radius: .33rem;
        -moz-border-radius: .33rem;
        border-radius: .33rem;
        padding-left: .3rem;
        &::placeholder {
          font-size: .14rem;
          color: #cccccc;
        }
      }
      p {
        font-size: .14rem;
        color: #999999;
      }
    }
    .s-model {
      position: fixed;
      width: 100%;
      height: 100%;
      background-color: #000;
      left: 0;
      top: .5rem;
      opacity: 0.5;
      z-index: 2044;
    }
    .mint-navbar {
      padding: 0 .15rem;
    }
    .mint-tab-item-label {
      i {
        font-size: .14rem;
        color: #000000;
        text-align: left;
      }
    }
    .mint-navbar .mint-tab-item.is-selected {
      border-bottom: 1px solid #e40011;
      color: #e40011;
      margin-bottom: 0px;
      .mint-tab-item-label {
        i {
          color: #e40011;
        }
      }
    }
    .orderCarInfo {
      .state {
        justify-content: space-between;
        padding: .15rem 0;
        margin: 0 .15rem;
        border-bottom: 1px solid #e9e9e9;
        .orderNo {

        }
      }
      .carCell {
        width: 100%;
        border-bottom: .075rem solid #f5f5f5;
        padding: .21rem .15rem;
        display: flex;
        flex-flow: row nowrap;
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

</style>
