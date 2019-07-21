// common/component/RichText/RichText.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    nodes: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal) {
        console.log(newVal)
        this.setData({
          nodes: newVal,
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
