<template>
  <div id="search">
    <header>
      <div class="search-box">
        <span class="iconfont icon-search1"></span>
        <form id="myForm" @submit='toSearchKey()' target="jshc_iframe" action="">
          <input id="myIpt" type="search" placeholder="搜索你想要的车..." v-model='searchKey'>
        </form>
        <iframe id="id_iframe" name="jshc_iframe" style="display:none;"></iframe>
      </div>
      <div class="cancel" @click='cancel()'>取消</div>
    </header>
    <div class="history" v-show='isShow'>
      <div class="title">历史搜索 <span class="iconfont icon-delete1" @click="deleteHis()"></span></div>
      <ul>
        <li v-for="(item,index) in historyList"
            :key="index"
            @click="toSearchKey(item)"
            :class="item.length>6?'hidden':''">{{item}}
        </li>
      </ul>
    </div>
    <div class="hot">
      <div class="title">热门搜索</div>
      <ul>
        <li v-for='(item,index) in hotList' :key="index" @click='goToList(item)'>{{item.remark}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import {mapState, mapGetters} from 'vuex'

  export default {
    name: "search",
    data() {
      return {
        hotList: [],
        searchKey: '',
        historyList: [],
        isShow: false
      }
    },
    mounted() {
      this.getHotSearch()
      this.getHistorySearchKey()
      // this.historyList = this.jshc_searchKey
      // console.log(1);
      if (this.historyList.length == 0) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    },
    computed: {
      // ...mapState(['jshc_searchKey']),
    },
    watch: {
      // jshc_searchKey: function () {
      //   console.log(this.historyList.length);
      //   if (this.jshc_searchKey.length == 0) {
      //     this.isShow = false
      //   } else {
      //     this.isShow = true
      //   }
      // }
    },
    methods: {
      cancel: function () {
        this.$router.go(-1)
      },
      getHotSearch: function () {
        let that = this
        let url = this.$com.baseUrl + '/wx/car/getHotSearchKey'
        this.$com.api(url, {}, (res) => {
          if (res.res_code == '0000') {
            that.hotList = res.data
          }
        })
      },
      goToList: function (item) {
        // console.log(item.id);
        let obj = {
          'text': item.remark,
          'value': item.id,
          'type': 'searchKey'
        }
        // console.log(obj);
        this.$store.commit('addData', obj)
        this.$router.push({path: '/car'})
        return false;
      },
      toSearchKey: function (item) {
        let obj = {}
        obj.type = "searchKey"
        let searcgKeyList = []
        if (localStorage.getItem('jshc_searchKey')) {
          searcgKeyList = JSON.parse(localStorage.getItem('jshc_searchKey'))
        }
        if (item) {
          obj.text = item
        } else {
          if (this.searchKey == '') {
            Toast({
              message: '请输入想要搜索的车辆',
              position: 'center',
              duration: 2000
            });
            return;
          }
          obj.text = this.searchKey
        }
        searcgKeyList.forEach((v, i) => {
          if (v == obj.text) {
            searcgKeyList.splice(i, 1)
          }
        })
        searcgKeyList.unshift(obj.text)
        console.log(searcgKeyList);
        console.log(obj.text);
        localStorage.setItem('jshc_searchKey', JSON.stringify(searcgKeyList))
        this.$store.commit('addData', obj)
        this.$router.push({path: '/car'})
      },
      getHistorySearchKey: function () {
        if (localStorage.getItem('jshc_searchKey')) {
          this.historyList = JSON.parse(localStorage.getItem('jshc_searchKey'))
        }
      },
      deleteHis: function () {
        localStorage.removeItem('jshc_searchKey')
        this.isShow = false
      },
    }
  }
</script>

<style scoped lang='less'>
  #search {
    padding: 0 .15rem;
    header {
      display: flex;
      padding: .22rem 0 .1rem;
      .search-box {
        width: 100%;
        position: relative;
        input {
          outline: none;
          border: none;
          background-color: #f5f5f5;
          padding-left: .35rem;
          width: 100%;
          height: .3rem;
          border-radius: .3rem;
          font-size: .15rem;
          &::placeholder {
            font-size: .15rem;
            color: #cccccc;
          }
        }
        span {
          position: absolute;
          left: .1rem;
          top: 0.07rem;
          color: #cccccc;
        }
      }
      .cancel {
        min-width: .4rem;
        text-align: right;
        color: #999999;
        line-height: .3rem;
        font-size: .16rem;
      }
    }
    .history {
      .title {
        font-size: .15rem;
        color: #999999;
        line-height: .45rem;
        span {
          line-height: .45rem;
          float: right;
        }
      }
      ul {
        display: flex;
        flex-flow: row wrap;
        li {

          text-align: center;
          border-radius: .25rem;
          background-color: #f5f5f5;
          margin-right: .15rem;
          margin-bottom: .15rem;
          padding: .05rem .2rem;
          &.hidden {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 1.5rem;
          }
        }
      }
    }
    .hot {
      .title {
        font-size: .15rem;
        color: #999999;
        line-height: .45rem;
      }
      ul {
        display: flex;
        flex-flow: row wrap;
        /*justify-content: space-between;*/
        li {
          width: .64rem;
          left: .25rem;
          line-height: .25rem;
          text-align: center;
          border-radius: .25rem;
          background-color: #f5f5f5;
          margin-right: .15rem;
          margin-bottom: .15rem;
        }
      }
    }
  }
</style>
