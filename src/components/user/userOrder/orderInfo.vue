<template>
  <div id="orderInfo">
    <sHeader :title="title"></sHeader>
    <div class="bb"></div>
    <div class="orderCarInfo">
      <div class="state df">
        <div class="orderNo">订单编号: <i>12345678</i></div>
        <div class="orderState">订单状态: <i>交易完成</i></div>
      </div>
      <div class="carCell">
        <div class="img">
          <img src="../../../assets/images/home/4/usedsuv@2x.png" alt="">
        </div>
        <div class="text">
          <div class="title">现代途胜 2018款 1.6T 双离合 两驱舒适型</div>
          <div class="factoryPirce">厂商指导价: <span>16.5</span>万</div>
          <div class="pirce">
            <div class="firstPay">首付<i>1.2</i>万</div>
            <div class="monthPay">月供<i>2666</i>元</div>
          </div>
        </div>
      </div>
    </div>
    <ul class='timeline'>
      <li v-for='(item,index) in list' :key='index'>
        <div class="ball" :class="[index==0?'success':'']"></div>
        <div class="line"></div>
        <div class="text" :class="[index==0?'success':'']">{{item.state}}</div>
        <div class="time" :class="[index==0?'success':'']">{{item.time}}</div>
      </li>

    </ul>
  </div>
</template>

<script>
  import sHeader from '../../common/smallHeader'
  import {Timeline} from 'vux'

  export default {
    name: "orderInfo",
    components: {
      sHeader,
      Timeline
    },
    data() {
      return {
        title: '订单详情',
        list: [
          {'state': '交易完成', 'time': '2018.04.06 12:34:12'},
          {'state': '车辆交付中', 'time': '2018.04.06 12:34:12'},
          {'state': '合同已签订', 'time': '2018.04.06 12:34:12'},
          {'state': '人工审核已通过', 'time': '2018.04.06 12:34:12'},
          {'state': '系统审核已通过', 'time': '2018.04.06 12:34:12'},
          {'state': '预约看车 预约时间:2018.04.11', 'time': '2018.04.06 12:34:12'},
        ]
      }
    }
  }
</script>

<style scoped lang='less'>
  #orderInfo {
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
    .timeline {
      padding: 0.35rem .15rem .5rem;
      li {
        width: 100%;
        height: .7rem;
        position: relative;
        left: 0;
        top: 0;
        .ball {
          width: .1rem;
          height: .1rem;
          border-radius: 50%;
          border: 1px solid #dddddd;
          left: 0;
          top: 0;
          position: absolute;
          &.success {
            border-color: #e40011;
            background-color: #e40011;
          }
        }
        .line {
          width: .01rem;
          height: .6rem;
          background-color: #dddddd;
          position: absolute;
          left: .04rem;
          top: .1rem;
        }
        .text {
          padding-left: .25rem;
          line-height: .1rem;
          font-size: .15rem;
          color: #999999;
          &.success {
            color: #000000;
          }
        }
        .time {
          padding-left: .25rem;
          margin-top: .1rem;
          font-size: .12rem;
          color: #999999;
          &.success {
            color: #000000;
          }
        }
      }
    }
  }

</style>
