<template>
  <div id="buy">
    <sHeader :title="title"></sHeader>
    <div class="bg"></div>
    <div class="bb"></div>
    <div class="carPrice">
      <mt-field placeholder="点击输入车辆金额 (不少于2万元)" v-model="carPrice" type="number"></mt-field>
    </div>
    <div class="bb"></div>
    <div class="fieldList">
      <ul class="buyInfo">
        <li>
          <popup-radio title="租用期限" :options="list" v-model="value"></popup-radio>
        </li>
        <li>
          <popup-radio title="营业门店" :options="storeList" v-model="store"></popup-radio>
        </li>
        <li>
          <div class="inputBox">
            <div class="title">客户归属</div>
            <input type="text" placeholder='客户经理号' v-model='code'>
          </div>
        </li>
        <li>
          <div class="inputBox">
            <div class="title">月租</div>
            <input type="number" placeholder='元' v-model='monthPay'>
          </div>
        </li>
      </ul>
      <div class='s-text'>具体金额以实际账单为准</div>
      <button>立即申请</button>
    </div>
  </div>
</template>

<script>
  import sHeader from '../common/smallHeader'
  import {Selector, PopupRadio, XInput, Group} from 'vux'

  export default {
    name: "buy",
    components: {
      sHeader,
      Selector,
      PopupRadio,
      XInput,
      Group
    },
    data() {
      return {
        carPrice: '',
        title:'我要提车',
        value: '12期',
        list: ['12期', '24期', '36期'],
        store: '请选择',
        storeList: ['A', 'B', 'C'],
        code: '',
        monthPay: ''
      }
    },
    methods: {
      showCarPrice: function () {
        console.log(this.carPrice);
      }
    }
  }
</script>

<style scoped lang='less'>
  #buy {
    .bg {
      width: 100%;
      height: 1.54rem;
      background: url("../../assets/images/other/buyBg.png") no-repeat;
      -webkit-background-size: 100% 1.54rem;
      background-size: 100% 1.54rem;
    }
    .carPrice {
      height: .77rem;
      .mint-cell {
        height: 100%;
        .mint-cell-wrapper {
          border: none;
          .mint-cell-value {
            padding-left: .6rem;

          }
        }
      }
    }
    .fieldList {
      padding: 0 .15rem;

      .buyInfo {
        > li {
          height: .52rem;
          border-bottom: 1px solid #dddddd;
          .weui-cell {
            padding: 0;
            line-height: .52rem;
          }
          .inputBox {
            display: flex;
            width: 100%;
            height: 100%;
            line-height: .52rem;
            .title {
              min-width: 60%;
            }
            input {
              width: 100%;
              height: 100%;
              outline: none;
              border: none;
              &::placeholder {
                text-align: right;
              }
            }
          }
        }
      }
      .s-text {
        font-size: .12rem;
        text-align: right;
        color: #cccccc;
        line-height: .3rem;
        margin-bottom: .14rem;
      }
      button {
        outline: none;
        border: none;
        width: 100%;
        background-color: #e40011;
        height: .5rem;
        font-size: .16rem;
        color: #ffffff;
        border-radius: .5rem;

      }
    }

  }

</style>
