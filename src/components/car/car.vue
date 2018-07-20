<template>
  <div id="car">
    <comHeader :back=true></comHeader>
    <comFiltrate :car-type='carType'></comFiltrate>
    <comCarList @listenTochildEvent='showMessageFromChild'></comCarList>
  </div>
</template>

<script>
  import comHeader from '../common/comHeader'
  import comFiltrate from '../common/comFiltrate'
  import comCarList from '../common/comCarList'
  import Vue from 'vue'



  export default {
    name: "car",
    components: {
      "comHeader": comHeader,
      "comFiltrate": comFiltrate,
      "comCarList": comCarList,
    },
    data() {
      return {
        carType: 'newcar',
        bus:new Vue()
      }
    },
    methods: {
      showMessageFromChild: function (data) {
        this.carType = data
      }
    }
  }
</script>

<style scoped>

</style>
