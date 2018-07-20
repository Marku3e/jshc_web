<template>
  <div id="service">
    <sHeader :title="title"></sHeader>
    <div class="bg"></div>
    <div class="container">
      <ul class="info">
        <li v-for="(item,index) in info" :key="index">
          <div class="left"></div>
          <div class="right">
            <h3>{{item.title}}</h3>
            <p>{{item.des}}</p>
          </div>
        </li>
      </ul>
      <router-link :to="'/store'" class="btn">查看全国门店</router-link>

    </div>
  </div>
</template>

<script>
  import sHeader from '../common/smallHeader'

  export default {
    name: "service",
    components: {
      sHeader,
    },
    data() {
      return {
        title: "服务保障",
        info: [
          {'title': '车况好', 'des': '车辆经过多项安全监测,车况有保证'},
          {'title': '服务全', 'des': '全程一站式车管家服务,专业、高效,值得信赖'},
          {'title': '车源广', 'des': '多款车型任你挑,总能选到放心好车'},
          {'title': '提车快', 'des': '最快当天客梯车,创造产品与您"0"距离体验'},
        ]
      }
    }
  }
</script>

<style scoped lang='less'>
  #service {
    .bg {
      width: 100%;
      height: 1.54rem;
      background: url("../../assets/images/other/serviceBg.png") no-repeat;
      -webkit-background-size: 100% 1.54rem;
      background-size: 100% 1.54rem;
    }
    .container {
      padding: 0 .15rem;

      .info {
        margin-bottom: .42rem;
        li {
          border-bottom: 1px solid #f5f5f5;
          display: flex;
          padding: .15rem 0;
          &:nth-of-type(2) {
            .left {
              background-image: url('../../assets/images/other/quan.png');
            }
          }
          &:nth-of-type(3) {
            .left {
              background-image: url('../../assets/images/other/guang.png');
            }
          }
          &:nth-of-type(4) {
            .left {
              background-image: url('../../assets/images/other/kuai.png');
            }
          }
          .left {
            width: .5rem;
            height: .5rem;
            background-image: url('../../assets/images/other/hao.png');
            background-repeat: no-repeat;
            -webkit-background-size: 100%;
            background-size: 100%;
            margin-right: .17rem;
          }
          .right {
            h3 {
              font-size: .17rem;
              font-weight: normal;
            }
            p {
              font-size: .13rem;
              color: #666666;
              line-height: .27rem;
            }
          }
        }
      }
      .btn {
        display: block;
        height: .5rem;
        border-radius: .5rem;
        border-color: #e40011;
        background-color: #e40011;
        color: #ffffff;
        font-size: .17rem;
        text-align: center;
        line-height: .5rem;
      }
    }
  }

</style>
