// rich-text 官方富文本组件，缺点
// 一些常用标签不支持，如section
// 不能实现图片和链接的点击
// 不支持音视频
// 不支持解析style标签
// 
// 转换官方组件不支持的标签
// //以u标签为例
// case 'u':
//     name = 'span';
//     attrs.style = 'text-decoration:underline;' + attrs.style;
//     break;
// 
// 顶层标签上加上user-select:text;-webkit-user-select 解决文本复制
// 
// 嵌套循环问题： 组件来解决层级深的问题

let html2wxml = require('html2wxml-main.js');

Component({
  data: {},
  options: {
    addGlobalClass: true
  },
  properties: {
    text: {
      type: String,
      value: null,
      observer: function(newVal, oldVal) {
        if (!newVal) return;

        if (this.data.type === 'html' || this.data.type === 'markdown' || this.data.type === 'md') {
          let data = {
            text: this.data.text,
            type: this.data.type,
            highlight: this.data.highlight,
            linenums: this.data.linenums,
          };

          if (!this.data.imghost) {
            data.imghost = this.data.imghost;
          }

          // TODO, should be a paramter.
          wx.request({
            url: 'https://www.qwqoffice.com/html2wxml/',
            data: data,
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: res => {
              html2wxml.html2wxml(res.data, this, this.data.padding);
            }
          })
        }
      }
    },
    json: {
      type: Object,
      value: {},
      observer: function(newVal, oldVal) {
        html2wxml.html2wxml(this.data.json, this, this.data.padding);
      }
    },
    type: {
      type: String,
      value: 'html'
    },
    highlight: {
      type: Boolean,
      value: true,
    },
    highlightStyle: {
      type: String,
      value: 'darcula'
    },
    linenums: {
      type: Boolean,
      value: true,
    },
    padding: {
      type: Number,
      value: 5
    },
    imghost: {
      type: String,
      value: null
    },
    showLoading: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    wxmlTagATap: function(e) {
      this.triggerEvent('WxmlTagATap', {
        src: e.currentTarget.dataset.src
      });
    }
  },
  attached: function() {}
})