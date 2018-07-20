import Vue from '../../main'

export default {
  // baseUrl: "http://192.168.1.155",
  baseUrl: "http://192.168.1.155:10010",
  // baseUrl: "http://192.168.1.186:8080",
  // baseUrl: "https://apiserver.jiushenghaoche.com",
  api: function (url, data, success, error) {
    let qs = require('qs')
    let instance = Vue.vue.$axios.create({
      headers: {'content-type': 'application/x-www-form-urlencoded'}
    });
    instance.post(url, qs.stringify(data))
      .then((result) => {
        if (success) {
          return success(result.data)
        } else {
          return result.data
        }
      })
  }
}
