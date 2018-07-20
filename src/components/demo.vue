<template>
  <div id='demo'>
    <input type="date" placeholder='请选择预约时间' @input="change($event)" class='full' id='ipt'>
    <label for="ipt">{{str}}</label>
  </div>
</template>

<script>
  import {Group, CellBox, Checklist, Cell, Divider, XButton} from 'vux'

  export default {
    components: {
      Group,
      Checklist,
      Cell,
      Divider,
      XButton,
      CellBox
    },
    data() {
      return {
        commonList: ['China', 'Japan', 'America'],
        checklist002: ['China', 'Japan'],
        str: '请选择预约时间'
      }
    },
    methods: {
      change(e) {
        console.log(e.target.value);
        this.str = e.target.value
      },
    }
  }
</script>

<style lang="less">
  #demo {
    label {
      display: block;
      width: 100%;
      height: .5rem;
      background-color: #000000;
      color: #ffffff;
      line-height: .5rem;
      padding-left: .2rem;
    }
    input[type="date"]:before {
      color: #A9A9A9;
      content: attr(placeholder);
    }

    input[type="date"].full:before {
      color: black;
      content: "" !important;
    }
    input {
      height: .5rem;
      border: none;
      outline: none;
      overflow: hidden;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
    }
  }
</style>
