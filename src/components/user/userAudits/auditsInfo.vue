<template>
  <div id="auditsInfo">
    <sHeader :title="title"></sHeader>
    <div class="bb"></div>
    <div class="container">
      <ul>
        <li>
          <div class="cellName">状态</div>
          <p>审核未通过</p>
        </li>
        <li>
          <div class="cellName">审核金额</div>
          <p><i>12000</i>元</p>
        </li>
        <li>
          <div class="cellName">申请期数</div>
          <p><i>36</i>期</p>
        </li>
        <li>
          <div class="cellName">申请时间</div>
          <p>2018.04.24</p>
        </li>
      </ul>
      <div class="backup">
        <h4>说明:</h4>
        <p>审核不通过,审核不通过审核不通过审核不通过审核不通过审核不通过</p>
      </div>
      <x-button class="btn" type="warn" @click.native="openPopup()">查看分期详情</x-button>
    </div>
    <div v-transfer-dom>
      <popup v-model="show" height="100%" class='popupBox'>
        <stages @closePopup='closePopup'></stages>
      </popup>
    </div>
  </div>

</template>

<script>
  import sHeader from '../../common/smallHeader'
  import stages from './stages'
  import {TransferDom, XButton, Popup} from 'vux'


  export default {
    name: "audits-info",
    directives: {
      TransferDom
    },
    components: {
      sHeader,
      stages,
      XButton,
      Popup
    },
    data() {
      return {
        title: '申请详情',
        sonTitle: '分期详情',
        show: false
      }
    }, methods: {
      openPopup: function () {
        this.show = true
      },
      closePopup: function (event, data) {
        this.show = event.show
      }
    }
  }
</script>

<style scoped lang='less'>
  #auditsInfo {
    .container {
      padding: 0 .15rem;
      ul > li {
        width: 100%;
        height: .52rem;
        line-height: .52rem;
        border-bottom: 1px solid #dddddd;
        display: flex;
        justify-content: space-between;
        font-size: .16rem;
        .cellName {
          color: #000000;
        }
        p {
          text-align: right;
          color: #666666;
        }
      }
    }
    .backup {
      margin-top: .3rem;
      margin-bottom: .56rem;
      h4 {
        font-size: .16rem;
        color: #000000;
        font-weight: 400;
      }
      p {
        font-size: .14rem;
        color: #666666;
        margin-top: .2rem;
        text-indent: 2em;
      }
    }
    .btn {
      width: 100%;
      height: .5rem;
      line-height: .5rem;
      font-size: .16rem;
      border-radius: .5rem;
    }
    #box {
      width: 100%;
      height: 100px;
      background-color: #000000;
    }
  }

</style>
