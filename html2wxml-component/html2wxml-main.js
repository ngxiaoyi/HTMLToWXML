/**
 * Project: HTMLToWXML
 * Description: 将HTML、Markdown转为微信小程序WXML 
 * Author: royslg
 * Organization: weshine (https://www.wshoto.com)
 */

/**
 * 配置及公有属性
 **/
let realWindowWidth = 0;
let realWindowHeight = 0;
wx.getSystemInfoSync({
  success: function (res) {
    realWindowWidth = res.windowWidth
    realWindowHeight = res.windowHeight
  }
})

function getNodes(data) {
  data.forEach(item => {
    item.name = item.tag;
    item.attrs = item.attr;
    item.children = item.nodes && getNodes(item.nodes);
    delete item.tag;
    delete item.attr;
    delete item.nodes;
    delete item.type;
  })
  return data;
}

/**
 * 主函数入口区
 **/
function html2wxml(data, target, imagePadding) {
  let images = target.data.images || [];

  console.log(data);
  data = {
    nodes: getNodes(data),
    images,
    view: {
      imagePadding: typeof imagePadding !== 'undefined' ? Number(imagePadding) : 0,
    }
  };
  console.log(data);
  target.setData(data);
  target.wxmlImgLoad = wxmlImgLoad;
  target.wxmlImgTap = wxmlImgTap;
}

// 图片点击事件
function wxmlImgTap(e) {
  let nowImgUrl = e.target.dataset.src;
  let imageUrls = this.data.imageUrls;

  imageUrls.length > 0 && wx.previewImage({
    current: nowImgUrl,
    urls: imageUrls
  })
}

/**
 * 图片视觉宽高计算函数区 
 * 假循环获取计算图片视觉最佳宽高
 **/
function wxmlImgLoad(e) {
  let idx = e.target.dataset.idx;
  let recal = wxAutoImageCal(e.detail.width, e.detail.height, this); // 因为无法获取view宽度 需要自定义padding进行计算

  e.currentTarget.dataset.src && this.setData({
    ['images[' + idx + ']']: { width: recal.imageWidth, height: recal.imageHeight },
    ['imageUrls[' + idx + ']']: e.currentTarget.dataset.src
  });
}

// 计算视觉优先的图片宽高
function wxAutoImageCal(originalWidth, originalHeight, that) {
  // 获取图片的原始长宽
  let padding = that.data.view.imagePadding;
  let windowWidth = realWindowWidth - 2 * padding;
  let windowHeight = realWindowHeight;
  let autoWidth = 0;
  let autoHeight = 0;
  let results = {
    imageWidth: originalWidth,
    imageHeight: originalHeight,
  };

  // 判断按照哪种方式进行缩放
  // 在图片width大于手机屏幕width时候
  if (originalWidth > windowWidth) {
    autoWidth = windowWidth;
    autoHeight = (autoWidth * originalHeight) / originalWidth;
    results.imageWidth = autoWidth;
    results.imageHeight = autoHeight;
  }

  return results;
}

module.exports = {
  html2wxml: html2wxml
}