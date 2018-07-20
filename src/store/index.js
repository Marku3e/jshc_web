import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);
const state = {
  localCity: '定位失败,请手动选择',
  confirmCity: false,
  newcarData: {
    isNewCar: '1',
    displacement: '',
    priceType: '',
    minPrice: '',
    maxPrice: '',
    monthRePayType: '',
    minMonthRePay: '',
    maxMonthRePay: '',
    firstPayType: '',
    minFirstPay: '',
    maxFirstPay: '',
    carAge: '',
    mile: '',
    gearbox: '',
    classify: '',
    carBrandId: '',
    carSeriesId: '',
    searchKey: '',
    carCityId: '',
    orderType: '',
    size: '4',
    page: '1',
  },
  usedcarData: {
    isNewCar: '0',
    displacement: '',
    priceType: '',
    minPrice: '',
    maxPrice: '',
    monthRePayType: '',
    minMonthRePay: '',
    maxMonthRePay: '',
    firstPayType: '',
    minFirstPay: '',
    maxFirstPay: '',
    carAge: '',
    mile: '',
    gearbox: '',
    classify: '',
    carBrandId: '',
    carSeriesId: '',
    searchKey: '',
    carCityId: '',
    orderType: '',
    size: '4',
    page: '1',
  },
  cityName: localStorage.getItem('jshc_loaclCity') || '全国',
  dataList: [],
  brandList: [],
  carSeriesList: [],
  hotBrandList: [],
  sendData: {
    minprice: '',
    maxprice: '',
    minfirstPay: '',
    maxfirstPay: '',
    minmonthPay: '',
    maxmonthPay: '',
  },
  filterList: ['priceList', 'firstPayList', 'monthPayList'],
  filtrateList: ['carTypeList', 'carYearList', 'carMileList', 'carDpmList', 'carGearBoxList',],
  jshc_searchKey: JSON.parse(localStorage.getItem('jshc_searchKey')) || []

}
const mutations = {
  //获取定位城市
  getLocationCity(state) {
    let map = new AMap.Map('container');
    map.plugin(["AMap.CitySearch"], function () {
      let citysearch = new AMap.CitySearch();
      citysearch.getLocalCity();
      AMap.event.addListener(citysearch, "complete", function (result) {
        if (result && result.city && result.bounds) {
          let cityinfo = result.city;
          state.localCity = cityinfo
          if (!localStorage.getItem('jshc_localCity')) {
            if (localStorage.getItem('jshc_localCity') != cityinfo) {
              state.confirmCity = true
              console.log(result);
            }
          }
          localStorage.setItem('jshc_localCity', cityinfo)


        }
        else {
          state.localCity = '定位失败,请手动选择'
        }
      });
    });
  },
  //修改城市
  changeCity(state, data) {
    state.newcarData.carCityId = data.id
    state.usedcarData.carCityId = data.id
    state.cityName = data.cityName
    state.newcarData.page = 1
    state.usedcarData.page = 1
  },
  addData(state, item) {
    state.dataList.forEach((v, i) => {
      if (item.type == v.type) {
        state.dataList.splice(i, 1)
      }
    })
    if (item.type == 'searchKey') {
      this.commit('resetData')
    } else {
      state.dataList.forEach((v, i) => {
        if (item.type == 'searchKey') {
          state.dataList.splice(i, 1)
        }
      })
      state.usedcarData.searchKey = ""
      state.newcarData.searchKey = ""
    }
    switch (item.type) {
      case 'brand':
        if (item.isSeries) {
          state.newcarData.carSeriesId = item.value
          state.usedcarData.carSeriesId = item.value
        } else {
          state.newcarData.carBrandId = item.value
          state.usedcarData.carBrandId = item.value
        }
        break;
      case 'price':
        let pstr = item.text[item.text.length - 1]
        if (pstr == '内') {
          state.newcarData.maxPrice = item.max
          state.usedcarData.maxPrice = item.max
        } else if (pstr == '上') {
          state.newcarData.minPrice = item.min
          state.usedcarData.minPrice = item.min
        } else if (pstr == '万') {
          state.newcarData.minPrice = item.min
          state.newcarData.maxPrice = item.max
          state.usedcarData.minPrice = item.min
          state.usedcarData.maxPrice = item.max
        }
        break;
      case 'firstPay':
        let fpstr = item.text[item.text.length - 1]
        if (fpstr == '内') {
          state.newcarData.maxFirstPay = item.max
          state.usedcarData.maxFirstPay = item.max
        } else if (fpstr == '上') {
          state.newcarData.minFirstPay = item.min
          state.usedcarData.minFirstPay = item.min
        } else if (fpstr == '万') {
          state.newcarData.minFirstPay = item.min
          state.newcarData.maxFirstPay = item.max
          state.usedcarData.minFirstPay = item.min
          state.usedcarData.maxFirstPay = item.max
        }
        break;
      case 'monthPay':
        let mpstr = item.text[item.text.length - 1]
        if (mpstr == '内') {
          state.newcarData.maxMonthRePay = item.max
          state.usedcarData.maxMonthRePay = item.max
        } else if (mpstr == '上') {
          state.newcarData.minMonthRePay = item.min
          state.usedcarData.minMonthRePay = item.min
        } else if (mpstr == '元') {
          state.newcarData.minMonthRePay = item.min
          state.newcarData.maxMonthRePay = item.max
          state.usedcarData.minMonthRePay = item.min
          state.usedcarData.maxMonthRePay = item.max
        }
        break;
      case 'carType':
        state.usedcarData.classify = item.value
        state.newcarData.classify = item.value
        break;
      case 'searchKey':
        state.usedcarData.searchKey = item.text
        state.newcarData.searchKey = item.text
    }
    console.log(item);

    state.dataList.push(item)
  },
  deleteData(state, data) {
    let type = data.type
    let min = 'min' + type
    let max = 'max' + type
    state.sendData[min] = ''
    state.sendData[max] = ''
    state.dataList.forEach((v, i) => {
      if (v.type == type) {
        state.dataList.splice(i, 1)
      }
      switch (v.type) {
        case 'brand':
          state.newcarData.carSeriesId = ''
          state.usedcarData.carSeriesId = ''
          state.newcarData.carBrandId = ''
          state.usedcarData.carBrandId = ''
          break;
        case 'price':
          state.newcarData.minPrice = ''
          state.newcarData.maxPrice = ''
          state.usedcarData.minPrice = ''
          state.usedcarData.maxPrice = ''
          break;
        case 'firstPay':
          state.newcarData.minFirstPay = ""
          state.newcarData.maxFirstPay = ""
          state.usedcarData.minFirstPay = ""
          state.usedcarData.maxFirstPay = ""
          break;
        case 'monthPay':
          state.newcarData.minMonthRePay = ""
          state.newcarData.maxMonthRePay = ""
          state.usedcarData.minMonthRePay = ""
          state.usedcarData.maxMonthRePay = ""
          break;
        case 'searchKey':
          state.usedcarData.searchKey = ""
          state.newcarData.searchKey = ""
      }
    })
    if (type == 'brand') {
      return;
    }
    let typeStr = type + 'List'
    filter.state[typeStr].forEach((v, i) => {
      v.active = false
    })
    filter.state[typeStr][0].active = true
  },
  resetData(state) {
    for (let key in  state.sendData) {
      state.sendData[key] = ''
    }
    for (let data in state.usedcarData) {
      if (data != 'isNewCar' && data != 'carCityId' && data != 'orderType'
        && data !== 'size' && data != 'page') {
        state.usedcarData[data] = ''
      }
    }
    for (let data in state.newcarData) {
      if (data != 'isNewCar' && data != 'carCityId' && data != 'orderType'
        && data !== 'size' && data != 'page') {
        state.newcarData[data] = ''
      }
    }
    let list = []
    state.dataList.forEach((v, i) => {
      list.push(v.type + 'List')
    })
    list.forEach((v, i) => {
      if (state[v]) {
        state[v].forEach((val, idx) => {
          val.active = false
        })
      } else if (filter.state[v]) {
        filter.state[v].forEach((val, idx) => {
          val.active = false
        })
        state.filterList.forEach((value, index) => {
          if (v == value) {
            filter.state[v][0].active = true
          }
        })
      } else {
        console.log('出错了');
      }
    })
    state.dataList.splice(0, state.dataList.length);
  },
  changeDef(state, value) {
    state.newcarData.orderType = value
    state.usedcarData.orderType = value
    console.log(value);
  },
  changeSize(state, data) {
    let size = parseInt(state[data].size)
    size += 5
    state[data].size = size
  },
  changeCarType(state, data) {
    let type = data.item.type
    let str = type + 'List'
    filter.state[str].forEach((v, i) => {
      v.active = false;
    })
    filter.state[str][data.index].active = true
  },
  filtrateReset(state) {
    state.filtrateList.forEach((v, i) => {
      filter.state[v].forEach((val, idx) => {
        val.active = false
      })
    })
    state.usedcarData.classify = ""
    state.usedcarData.carAge = ""
    state.usedcarData.mile = ""
    state.usedcarData.displacement = ""
    state.usedcarData.gearbox = ""
  },
  //获取热门品牌
  getHotBrand(state, data) {
    state.hotBrandList = data
    state.hotBrandList.forEach((v, i) => {
      v.type = 'brand'
    })
  },
  //获取品牌列表
  getBrand(state, data) {
    state.brandList = data
  },
  //获取车系列表
  getCarSeries(state, data) {
    state.carSeriesList = data
  },
}
const getters = {
  getDataList: state => {
    return state.dataList;
  },
  getSearchKey: state => {
    return state.jshc_searchKey
  },
  getCity: state => {
    return state.confirmCity
  }
}
const modules = {
  filterData: filter
}
import filter from './filter'

export default new vuex.Store({
  modules,
  state,
  mutations,
  getters,
})
