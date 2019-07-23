// common/component/RichText/RichText.js
let realWindowWidth = 0;
let realWindowHeight = 0;
wx.getSystemInfo({
  success: function (res) {
    console.log('huoqu')
    realWindowWidth = res.windowWidth
    realWindowHeight = res.windowHeight
  }
})

// 假循环获取计算图片视觉最佳宽高
function calMoreImageInfo(e, idx, that) {

  //因为无法获取view宽度 需要自定义padding进行计算
  let recal = wxAutoImageCal(e.detail.width, e.detail.height, that);
  that.setData({
    ['images[' + idx + ']']: { width: recal.imageWidth, height: recal.imageHeight },
    ['imageUrls[' + idx + ']']: e.currentTarget.dataset.src
  })
}

// 计算视觉优先的图片宽高
function wxAutoImageCal(originalWidth, originalHeight, that) {

  // 获取图片的原始长宽
  let windowWidth = 0, windowHeight = 0;
  let autoWidth = 0, autoHeight = 0;
  let results = {};
  let padding = that.data.view && that.data.view.imagePadding || 0;
  windowWidth = realWindowWidth - 2 * padding;
  windowHeight = realWindowHeight;

  // 判断按照那种方式进行缩放
  // 在图片width大于手机屏幕width时候
  if (originalWidth > windowWidth) {
    autoWidth = windowWidth;
    autoHeight = (autoWidth * originalHeight) / originalWidth;
    results.imageWidth = autoWidth;
    results.imageHeight = autoHeight;
  }
  // 否则展示原来的数据
  else {
    results.imageWidth = originalWidth;
    results.imageHeight = originalHeight;
  }
  return results;
}



Component({
  /**
   * 组件的属性列表，进度条第四步，包含node子节点的递归调用
   */
  properties: {
    nodes: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // console.log(this.data.nodes);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    wxmlImgTap: function(e) {
      // console.log(e);
      // let that = this;
      let nowImgUrl = e.target.dataset.src;
      let imageUrls = this.data.imageUrls;
      let newImageUrls = [];
      for (let i in imageUrls) {
        if (imageUrls[i] !== undefined) {
          newImageUrls.push(imageUrls[i]);
        }
      }
      if (newImageUrls.length > 0) {
        wx.previewImage({
          current: nowImgUrl,
          urls: newImageUrls
        })
      }
    },
    wxmlImgLoad: function(e) {
      // let that = this,
      let idx = e.target.dataset.idx;
      calMoreImageInfo(e, idx, this);
    },

    wxmlTagATap: function(e) {
      // console
      this.triggerEvent('WxmlTagATap', {
        src: e.currentTarget.dataset.src,
      });
    }
  }
})
