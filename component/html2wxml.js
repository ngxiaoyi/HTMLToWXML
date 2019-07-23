// 主要是处理HTML机构，转换成所需结构，渲染及递归逻辑交给依赖的核心组件。

let html2wxml = require('html2wxml-main.js');
let util = require('../../../common/utils/util.js');
Component({
  data: {},
  options: {
    addGlobalClass: true,
  },
  properties: {
    text: {
      type: String,
      value: null,
      observer: function(newVal, oldVal) {
        this.setData({ showLoading: true });

        if (newVal == '') { this.setData({ showLoading: false }); return; }

        if (this.data.type == 'html' || this.data.type == 'markdown' || this.data.type == 'md') {
          // this.setData({
          //   html: this.data.text,
          // })
          let data = {
            text: this.data.text,
            type: this.data.type,
            highlight: this.data.highlight,
            linenums: this.data.linenums,
          };

          if (this.data.imghost != null) {
            data.imghost = this.data.imghost;
          }

          // TODO, change back
          // 获取接口返回的HTML解析结果，进度条的第一步；
          util.request({
            url: 'html2wxml/index/decode',
            data: data,
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            success: res => {
              html2wxml.html2wxml(res.data, this, this.data.padding);
            },
          });
        }
      },
    },
    json: {
      type: Object,
      value: {},
      observer: function(newVal, oldVal) {
        html2wxml.html2wxml(this.data.json, this, this.data.padding);
      },
    },
    type: {
      type: String,
      value: 'html',
    },
    highlight: {
      type: Boolean,
      value: true,
    },
    highlightStyle: {
      type: String,
      value: 'darcula',
    },
    linenums: {
      type: Boolean,
      value: true,
    },
    padding: {
      type: Number,
      value: 5,
    },
    imghost: {
      type: String,
      value: null,
    },
    showLoading: {
      type: Boolean,
      value: true,
    },
  },
  methods: {
    wxmlTagATap: function(e) {
      this.triggerEvent('WxmlTagATap', {
        src: e.currentTarget.dataset.src,
      });
    },
  },
  attached: function() {},
});
