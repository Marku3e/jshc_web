export default {
  state: {
    filter: [
      {'text': '默认排序', 'icon': 'icon-down', 'active': false, 'model': false},
      {'text': '品牌', 'icon': 'icon-down', 'active': false, 'model': false},
      {'text': '价格', 'icon': 'icon-down', 'active': false, 'model': false},
      {'text': '首付', 'icon': 'icon-down', 'active': false, 'model': false},
      {'text': '月供', 'icon': 'icon-down', 'active': false, 'model': false},
      {'text': '筛选', 'icon': 'icon-down', 'active': false, 'model': false},
    ],
    defList: [
      {'value': '1', 'text': '默认排序', 'icon': 'icon-duigou', 'active': true, 'carType': 'newcar'},
      {'value': '2', 'text': '价格最低', 'icon': 'icon-duigou', 'active': false, 'carType': 'newcar'},
      {'value': '3', 'text': '价格最高', 'icon': 'icon-duigou', 'active': false, 'carType': 'newcar'},
      {'value': '6', 'text': '车龄最短', 'icon': 'icon-duigou', 'active': false, 'carType': 'usedcar'},
      {'value': '7', 'text': '里程最少', 'icon': 'icon-duigou', 'active': false, 'carType': 'usedcar'},
      {'value': '4', 'text': '首付最低', 'icon': 'icon-duigou', 'active': false, 'carType': 'newcar'},
      {'value': '5', 'text': '月供最低', 'icon': 'icon-duigou', 'active': false, 'carType': 'newcar'},
    ],
    priceList: [
      {'min': '', 'max': '', 'text': '不限', 'active': true, 'type': 'price'},
      {'min': '0', 'max': '5', 'text': '5万以内', 'active': false, 'type': 'price'},
      {'min': '5', 'max': '10', 'text': '5-10万', 'active': false, 'type': 'price'},
      {'min': '10', 'max': '15', 'text': '10-15万', 'active': false, 'type': 'price'},
      {'min': '15', 'max': '20', 'text': '15-20万', 'active': false, 'type': 'price'},
      {'min': '20', 'max': '30', 'text': '20-30万', 'active': false, 'type': 'price'},
      {'min': '30', 'max': '40', 'text': '30-40万', 'active': false, 'type': 'price'},
      {'min': '40', 'max': '50', 'text': '40-50万', 'active': false, 'type': 'price'},
      {'min': '50', 'max': '', 'text': '50万以上', 'active': false, 'type': 'price'},
    ],
    firstPayList: [
      {'min': '', 'max': '', 'text': '不限', 'active': true, 'type': 'firstPay'},
      {'min': '0', 'max': '1', 'text': '1万以内', 'active': false, 'type': 'firstPay'},
      {'min': '1', 'max': '2', 'text': '1-2万', 'active': false, 'type': 'firstPay'},
      {'min': '2', 'max': '3', 'text': '2-3万', 'active': false, 'type': 'firstPay'},
      {'min': '3', 'max': '4', 'text': '3-4万', 'active': false, 'type': 'firstPay'},
      {'min': '4', 'max': '5', 'text': '4-5万', 'active': false, 'type': 'firstPay'},
      {'min': '5', 'max': '10', 'text': '5-10万', 'active': false, 'type': 'firstPay'},
      {'min': '10', 'max': '', 'text': '10万以上', 'active': false, 'type': 'firstPay'},
    ],
    monthPayList: [
      {'min': '', 'max': '', 'text': '不限', 'active': true, 'type': 'monthPay'},
      {'min': '0', 'max': '2000', 'text': '2000以内', 'active': false, 'type': 'monthPay'},
      {'min': '2000', 'max': '3000', 'text': '2000-3000元', 'active': false, 'type': 'monthPay'},
      {'min': '3000', 'max': '4000', 'text': '3000-4000元', 'active': false, 'type': 'monthPay'},
      {'min': '4000', 'max': '5000', 'text': '4000-5000元', 'active': false, 'type': 'monthPay'},
      {'min': '5000', 'max': '', 'text': '5000元以上', 'active': false, 'type': 'monthPay'},
    ],
    carTypeList: [
      {'value': '', 'text': '不限车型', 'active': false, 'type': 'carType'},
      {'value': '0', 'text': '两厢轿车', 'active': false, 'type': 'carType'},
      {'value': '1', 'text': '三厢轿车', 'active': false, 'type': 'carType'},
      {'value': '2', 'text': '跑车', 'active': false, 'type': 'carType'},
      {'value': '3', 'text': 'SUV', 'active': false, 'type': 'carType'},
      {'value': '4', 'text': 'MPV', 'active': false, 'type': 'carType'},
      {'value': '5', 'text': '面包车', 'active': false, 'type': 'carType'},
      {'value': '6', 'text': '皮卡', 'active': false, 'type': 'carType'},
    ],
    carYearList: [
      {'value': '0', 'text': '一年内', 'active': false, 'type': 'carYear'},
      {'value': '1', 'text': '两年内', 'active': false, 'type': 'carYear'},
      {'value': '2', 'text': '三年内', 'active': false, 'type': 'carYear'},
      {'value': '3', 'text': '3 - 5年', 'active': false, 'type': 'carYear'},
      {'value': '4', 'text': '5年以上', 'active': false, 'type': 'carYear'},
    ],
    carMileList: [
      {'value': '0', 'text': '一万公里以下', 'active': false, 'type': 'carMile'},
      {'value': '1', 'text': '3万公里以下', 'active': false, 'type': 'carMile'},
      {'value': '2', 'text': '5万公里以下', 'active': false, 'type': 'carMile'},
      {'value': '3', 'text': '10万公里以下', 'active': false, 'type': 'carMile'},
      {'value': '4', 'text': '10万公里以上', 'active': false, 'type': 'carMile'},
    ],
    carDpmList: [
      {'value': '0', 'text': '1.0L以下', 'active': false, 'type': 'carDpm'},
      {'value': '1', 'text': '1.0L - 1.6L', 'active': false, 'type': 'carDpm'},
      {'value': '2', 'text': '1.6L - 2.0L', 'active': false, 'type': 'carDpm'},
      {'value': '3', 'text': '2.0L - 3.0L', 'active': false, 'type': 'carDpm'},
      {'value': '4', 'text': '3.0L以上', 'active': false, 'type': 'carDpm'},
    ],
    carGearBoxList: [
      {'value': '0', 'text': 'MT', 'active': false, 'type': 'carGearBox'},
      {'value': '1', 'text': 'AT', 'active': false, 'type': 'carGearBox'},
      {'value': '2', 'text': 'AMT', 'active': false, 'type': 'carGearBox'},
      {'value': '3', 'text': 'DSG', 'active': false, 'type': 'carGearBox'},
      {'value': '4', 'text': 'CVT', 'active': false, 'type': 'carGearBox'},
    ],

  },
  mutations: {}
}
