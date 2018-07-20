<template>
  <div id="app">
    <router-view v-wechat-title='$route.meta.title'></router-view>
    <div v-transfer-dom>
      <confirm v-model="show"
               :title="title"
               @on-confirm="onConfirm">
        <p style="text-align:center;">是否切换?</p>
      </confirm>
    </div>
  </div>
</template>

<script>
  import {Confirm, TransferDomDirective as TransferDom} from 'vux'
  import {mapState, mapGetters} from 'vuex'

  export default {
    name: 'App',
    directives: {
      TransferDom
    },
    components: {
      Confirm,
    },
    data() {
      return {
        show: false,
        title: '当前定位城市为...'
      }
    },
    watch: {
      getCity: function (val) {
        console.log(val);
        if (val) {
          console.log(this.localCity);
          this.title = '当前定位城市为' + this.localCity
          this.show = true
        }
      },
      show: function (val) {
        if (val) {
          document.getElementsByTagName('html')[0].className = 'no-scroll'
        } else {
          document.getElementsByTagName('html')[0].className = ''

        }

      }
    },
    computed: {
      ...mapState(['localCity', 'confirmCity']),
      ...mapGetters(['getCity'])
    },
    mounted() {
    },
    methods: {
      onConfirm() {
        console.log('切换成武汉市');
      },
    },
  }
</script>

<style scoped lang='less'>
  #app {
    width: 100%;
    height: 100%;
  }

</style>
