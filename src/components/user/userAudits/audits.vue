<template>
  <div id="audits">
    <sHeader :title='title'></sHeader>
    <div class="bb"></div>
    <router-link :to="'/user/audits/info'" class="auditsCell" v-for="(item,index) in auditsList" :key='index'>
      <div class="auditsInfo df">
        <div class="info">
          <h4>¥ <i>{{item.price}}</i></h4>
          <p><i>{{item.trim}}</i>期</p>
          <p>申请时间: <i>{{item.time}}</i></p>
        </div>
        <div class="state" :style="{color:item.color}">{{item.state}}</div>
      </div>
      <div class="bb"></div>
    </router-link>
  </div>
</template>

<script>
  import sHeader from '../../common/smallHeader'

  export default {
    name: "audits",
    components: {
      sHeader
    },
    data() {
      return {
        title: '我的申请',
        auditsList: [],
        list: [
          {'price': '20000', 'trim': '12', 'time': '2018.04.20', 'state': '审核中'},
          {'price': '40000', 'trim': '12', 'time': '2018.04.21', 'state': '申请未通过'},
          {'price': '60000', 'trim': '24', 'time': '2018.04.22', 'state': '已放款'},
          {'price': '80000', 'trim': '24', 'time': '2018.04.23', 'state': '未结清'},
          {'price': '100000', 'trim': '36', 'time': '2018.04.24', 'state': '已结清'},
        ]
      }
    },
    mounted() {
      this.getAudits()
    },
    methods: {
      getAudits: function () {
        let that = this
        that.auditsList = that.list
        that.auditsList.forEach(function (v, i) {
          switch (v.state) {
            case '审核中':
              that.auditsList[i].color = '#0ebcee'
              break;
            case '申请未通过':
              that.auditsList[i].color = '#e40011'
              break;
            case '已放款':
              that.auditsList[i].color = '#1dbf8d'
              break;
            case '未结清':
              that.auditsList[i].color = '#fca53b'
              break;
            default:
              that.auditsList[i].color = '#8b84f8'
              break;
          }
        })
      }
    }
  }
</script>

<style scoped lang='less'>
  #audits {
    .auditsCell {
      .auditsInfo {
        width: 100%;
        height: 1.08rem;
        justify-content: space-between;
        padding: 0 .15rem;
        .info {
          width: 60%;
          padding-top: .2rem;
          h4 {
            font-size: .18rem;
            i {
              font-size: .18rem;
            }
            color: #e40011;
          }
          p {
            font-size: .13rem;
            color: #999999;
            line-height: .22rem;
          }
        }
        .state {
          width: 40%;
          font-size: .17rem;
          color: #0ebcee;
          text-align: right;
          line-height: 1.08rem;

        }
      }
    }
  }

</style>
