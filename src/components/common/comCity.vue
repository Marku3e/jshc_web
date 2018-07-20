<template>
  <div id="comCity">
    <header>
      <div class="back" @click="back()">
        <span class='iconfont icon-back'></span>
      </div>
      <p>{{title}}</p>
    </header>
    <div class="indexList">
      <mt-index-list>
        <div class="locationCity">
          <div class="title">当前定位城市</div>
          <div class="city">{{localCity}}</div>
        </div>
        <mt-index-section index="*">
          <div @click='sendCityId("","全国")' class='cityCell'>
            <mt-cell title='全国' cityId=""></mt-cell>
          </div>
        </mt-index-section>
        <mt-index-section :index="init" v-for="(init, index) in initialList" :key="index">
          <div class='cityCell' @click="sendCityId(city.carCityId,city.city)"
               v-for="(city,idx) in cityList[index].citys"
               :key='idx'>
            <mt-cell :title="city.city"
                     :cityId="city.carCityId">

            </mt-cell>
          </div>
        </mt-index-section>
      </mt-index-list>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: "comCity",
    props: ['sendApi'],
    data() {
      return {
        title: '选择城市',
        initialList: [],
        cityList: []
      }
    },
    watch: {
      'sendApi': function (val) {
        if (val) {
          this.getAllCity()
        }
      }
    },
    computed: {
      ...mapState(['localCity'])
    },
    mounted() {
      this.$store.commit('getLocationCity')

    },
    methods: {
      back: function () {
        let data = {
          show: false
        };
        this.$emit('closePopup', data, 'closePopup');
      },
      getAllCity: function () {
        let url = this.$com.baseUrl + '/wx/car/getCitysWithInitial'
        let that = this
        this.$com.api(url, {}, (res) => {
          // console.log(res);
          if (res.res_code == '0000') {
            that.initialList = res.data.initialList
            that.cityList = res.data.cityList
          }
        })
      },
      sendCityId: function (id, cityName) {
        this.$store.commit('changeCity', {id, cityName})
        this.$emit('getCityName', cityName, id)
        this.$emit('closePopup', {show: false});
      },

    }
  }
</script>

<style scoped lang='less'>
  #comCity {
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
    .locationCity {
      .title {
        height: .3rem;
        line-height: .3rem;
        padding: 0 .15rem;
        background-color: #f5f5f5;

      }
      .city {
        height: .48rem;
        line-height: .48rem;
        padding: 0 .15rem;
        background-color: #fff;

      }
    }
    .cityCell {
      border-bottom: 1px solid #e9e9e9;
      &:last-child {
        border-bottom: 0;
      }
    }
  }

</style>
